const express = require('express')

const app = express()

app.use(express.json());

require('./src/routes')(app)

const PORT = 3001

app.listen(3001, () => {
    console.log('Listening on port ' + PORT)
})