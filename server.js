const express = require('express')

// Largely based on olinations/crud-starter-api. Much thanks!
// use process.env variables to keep private variables,
// be sure to ignore the .env file in github
require('dotenv').config({path: process.env.DOTENV_CONFIG_PATH});
console.log(require('dotenv').config());

// Express Middleware
const helmet = require('helmet') // creates headers that protect from attacks (security)
const bodyParser = require('body-parser') // turns response into usable format
const cors = require('cors')  // allows/disallows cross-site communication
const morgan = require('morgan') // logs requests

const controller = require('./controllers/resource.controller')


// App
const app = express()

// App Middleware
const whitelist = ['http://localhost:3001']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(morgan('combined')) // use 'tiny' or 'combined'
app.use(helmet())
app.use(cors(corsOptions))
app.use(bodyParser.json())


// App Routes - Auth
app.get('/agencies', (req, res) => controller.findAll(req, res, "agency"))
app.get('/agencies/:id',(req, res) => controller.findOne(req, res, "agency", "id"))
app.get('/calendars', (req, res) => controller.findAll(req, res, "calendar"))
app.get('/calendars/:id', (req, res) => controller.findOne(req, res, "calendar", "serviceId"))
app.get('/feed_info', (req, res) => controller.findAll(req, res, "feed_info"))
app.get('/feed_info/:id', (req, res) => controller.findOne(req, res, "feed_info", "publisherName"))
app.get('/routes', (req, res) => controller.findAll(req, res, "routes"))
app.get('/routes/:id', (req, res) => controller.findOne(req, res, "routes", "id"))
app.get('/routes', (req, res) => controller.findAll(req, res, "shapes"))
app.get('/routes/:id', (req, res) => controller.findOne(req, res, "shapes", "id"))
app.get('/stops', (req, res) => controller.findAll(req, res, "stops"))
app.get('/stops/:id', (req, res) => controller.findOne(req, res, "stops", "id"))
app.get('/stops', (req, res) => controller.findAll(req, res, "stop_times"))
app.get('/stops/:id', (req, res) => controller.findOne(req, res, "stop_times", "tripId"))
app.get('/transfers', (req, res) => controller.findAll(req, res, "transfers"))
app.get('/transfers/:id', (req, res) => controller.findOne(req, res, "transfers", "fromStopId"))


// App Server Connection
app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT || 3000}`)
})