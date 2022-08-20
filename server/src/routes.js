const express = require('express')
const cors = require('cors')

const middleware = require('./middleware/middleware')

module.exports = function (app) {
    app.use(express.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded
    app.use(express.static('public'))

    //Simple cors configuration for React app
    let corsOptions = {
        origin: "http://localhost:3000"
    }

    app.use(cors(corsOptions))

    app.use(function (req, res, next) {
        //Only accepts "application/json" media type
        if (!req.accepts("application/json")) {
            const e = new Error("Values allowed for Accept header ['application/json']")
            e.status = 501
            return next(e)
        }

        next()
    })

    //Using only one file for both routes and highlights routes implementation just for simplicity’s sake
    app.use('/', middleware)

    app.use((err, req, res, _next) => {
        res.status(err.status || 500)
            .json({
                message: err.message
            })
    })
}