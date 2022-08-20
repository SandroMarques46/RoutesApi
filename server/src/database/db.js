const {pool} = require('./databaseConnection')

async function getRoutes() {
    const resp = await pool.query(`SELECT r.id,
                                          r.description,
                                          l1.latitude  as start_latitude,
                                          l1.longitude as start_longitude,
                                          l2.latitude  as end_latitude,
                                          l2.longitude as end_longitude
                                   FROM route r
                                            INNER JOIN location l1 ON r.start_location_id = l1.id
                                            INNER JOIN location l2 ON r.end_location_id = l2.id`)
    return resp.rows
}

async function getRouteHighlights(routeId) {
    const resp = await pool.query(`SELECT h.*, l.latitude, l.longitude
                                   FROM route_highlights rh
                                            INNER JOIN highlight h
                                                       ON rh.highlight_id = h.id
                                            INNER JOIN location l ON rh.highlight_id = l.id
                                   WHERE rh.route_id = '${routeId}'`)

    return resp.rows
}

//Used for finding the nearest highlight
//This query should be updated with paging since unbounded queries are dangerous!
async function getAllHighlights() {
    const resp = await pool.query(`SELECT hl.id,
                                          hl.name,
                                          hl.description,
                                          hl.rating,
                                          l.latitude,
                                          l.longitude
                                   FROM highlight hl
                                            INNER JOIN location l ON hl.location_id = l.id`)

    return resp.rows
}

module.exports = {
    getRoutes,
    getRouteHighlights,
    getAllHighlights
}