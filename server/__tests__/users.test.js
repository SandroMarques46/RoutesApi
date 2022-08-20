const request = require('supertest')
const express = require('express')

//Used to close the database connection after all tests
//(or else jest warns that the tests are not finishing gracefully - prone to memory leaks)
const {pool} = require('../src/database/databaseConnection')
const db = require("../src/database/db")

let app = express()
require('../src/routes')(app)

describe('Api test', () => {
    test('Get routes test', async () => {
        const routes = await db.getRoutes()
        const start_latitude = routes[0].start_latitude
        const start_longitude = routes[0].start_longitude
        const end_latitude = routes[0].end_latitude
        const end_longitude = routes[0].end_longitude

        //invalid query
        let response = await request(app)
            .get(`/routes`)
        expect(response.status).toBe(400)

        response = await request(app)
            .get(`/routes?start_latitude=aaaaaaaa`)
        expect(response.status).toBe(400)

        //only one coordinate
        response = await request(app)
            .get(`/routes?start_latitude=30&start_longitude=-7`)
        expect(response.status).toBe(400)

        //correct query
        response = await request(app)
            .get(`/routes?start_latitude=${start_latitude}&start_longitude=${start_longitude}&end_latitude=${end_latitude}&end_longitude=${end_longitude}`)
        expect(response.status).toBe(200)
        expect(response.body.routes.length).toBeGreaterThanOrEqual(1)
    })

    test('Get nearest highlight test', async () => {
        const highlights = await db.getAllHighlights()
        const latitude = highlights[0].latitude
        const longitude = highlights[0].longitude

        //nearest highlight of a highlight itself must return the same highlight
        let response = await request(app)
            .get(`/highlight?latitude=${latitude}&longitude=${longitude}`)
        expect(response.status).toBe(200)
        expect(response.body.highlight).toStrictEqual(highlights[0])
    })
})

afterAll(async () => {
    return await pool.end()
})