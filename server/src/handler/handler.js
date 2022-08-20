const geolib = require("geolib")
const db = require('../database/db')
const {ServicesError, handleErrors} = require("./mainHandler")

async function getPossibleRoutes(req) {
    try {
        let start_latitude = req.query.start_latitude
        let start_longitude = req.query.start_longitude
        let end_latitude = req.query.end_latitude
        let end_longitude = req.query.end_longitude

        if (start_latitude == null || start_longitude == null || end_latitude == null || end_longitude == null) {
            //throw will be caught locally to be handled correctly
            throw new ServicesError(400, "Missing query string parameters!")
        }

        try {
            start_latitude = parseFloat(start_latitude)
            start_longitude = parseFloat(start_longitude)
            end_latitude = parseFloat(end_latitude)
            end_longitude = parseFloat(end_longitude)
        } catch (e) {
            throw new ServicesError(400, "Invalid query lat/long values!")
        }

        const steps = createSteps(start_latitude, start_longitude, end_latitude, end_longitude)

        const routes = await db.getRoutes()

        const validRoutes = []

        for (const route of routes) {
            //Check if route is valid.
            //A route is valid if it starts and ends on or near any step on the "imaginary straight line" from the starting and the
            //end point selected by the user
            //E.g . If the user selects Faro to Porto , lisbon related routes will probably be included since they are "on the way".
            const startRouteLocation = {latitude: route.start_latitude, longitude: route.start_longitude}
            const endRouteLocation = {latitude: route.end_latitude, longitude: route.end_longitude}
            let validStart = false
            let validEnd = false
            let idx = 0
            while (idx < steps.length) {
                if (validStart && validEnd) break
                let step = steps[idx++]
                if (geolib.getDistance(startRouteLocation, step) < 50000) {
                    validStart = true
                }

                if (geolib.getDistance(endRouteLocation, step) < 50000) {
                    validEnd = true
                }
            }

            //if is valid route find their highlights and save it
            if (validStart && validEnd) {
                route.highlights = await db.getRouteHighlights(route.id)
                validRoutes.push(route)
            }
        }

        return validRoutes
    } catch (e) {
        handleErrors(e)
    }
}

/**
 * Creates the steps of the imaginary straight line from a start to end point (lat/long pairs)
 * E.g. using 10 steps
 *           1º  2º  3º  4º  5º  6º  7º  8º  9º 10º 11º
 *      Faro |---|---|---|---|---|---|---|---|---|---| Porto
 * @param start_latitude start point latitude
 * @param end_latitude end point latitude
 * @param start_longitude start point longitude
 * @param end_longitude end point longitude
 * @returns an array of steps (each object has properties latitude and longitude)
 */
function createSteps(start_latitude, start_longitude, end_latitude, end_longitude) {
    const steps = []

    const numOfSteps = 10

    //latitude
    const numLatSteps = parseFloat(((start_latitude - end_latitude) / numOfSteps).toFixed(6))

    let latStart = numLatSteps > 0 ? Math.min(start_latitude, end_latitude) : Math.max(start_latitude, end_latitude)

    let idx = 0
    do {
        steps.push({latitude: latStart})
        latStart += numLatSteps
        idx++
    } while (idx <= numOfSteps)

    //longitude
    const numLongSteps = parseFloat(((start_longitude - end_longitude) / numOfSteps).toFixed(6))
    let longStart = latStart === start_latitude ? start_longitude : end_longitude

    steps.forEach(step => {
        step.longitude = longStart
        longStart += numLongSteps
    })

    return steps
}

async function getNearestHighlight(req) {
    try {
        let latitude = req.query.latitude
        let longitude = req.query.longitude

        if (latitude == null || longitude == null) {
            //throw will be caught locally to be handled correctly
            throw new ServicesError(400, "Missing query string parameters!")
        }

        try {
            latitude = parseFloat(latitude)
            longitude = parseFloat(longitude)
        } catch (e) {
            throw new ServicesError(400, "Invalid query lat/long values!")
        }

        const highlights = await db.getAllHighlights()

        //Find the nearest highlight
        let nearestHighlightDistance = null
        let nearestHighlight = null

        highlights.forEach(hl => {
            //gets nearestHighlightDistance (in meters) between the highlight and the lat/long pair from the HTTP request
            const distanceDiff = geolib.getDistance({latitude, longitude}, {
                latitude: hl.latitude,
                longitude: hl.longitude
            })

            if (nearestHighlightDistance === null || distanceDiff < nearestHighlightDistance) {
                nearestHighlightDistance = distanceDiff
                nearestHighlight = hl
            }
        })

        return {highlight: nearestHighlight, distance: nearestHighlightDistance}
    } catch (e) {
        handleErrors(e)
    }
}

module.exports = {
    getPossibleRoutes,
    getNearestHighlight
}