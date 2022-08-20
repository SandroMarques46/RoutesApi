const app = require('express')
const router = app.Router()

//Again, using one handler file for every request just for simplicity's sake
const handler = require('../handler/handler')

//Get possible routes from a start and an end point parameters identified on query string
router.get('/routes', getPossibleRoutes)

//Get the nearest highlight of the start and the end point parameter identified on query string
router.get('/highlight', getNearestHighlight)

function getPossibleRoutes(req, res, next) {
    return handler.getPossibleRoutes(req)
        .then(routes => {
            return res.status(200).json({routes}).end()
        }).catch(e => next(e))
}

function getNearestHighlight(req, res, next) {
    return handler.getNearestHighlight(req)
        .then(resp => {
            return res.status(200).json(resp).end()
        }).catch(e => next(e))
}

module.exports = router