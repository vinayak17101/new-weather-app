const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Defining handlebars views directory
const publicDirectoryPath = path.join(__dirname, '../public')
const viewDirectory = path.join(__dirname, '../templates/views')
const partialDirectory = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view locations
app.set('view engine', 'hbs')
app.set('views', viewDirectory)
hbs.registerPartials(partialDirectory)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Vinayak Bhartia'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Vinayak Bhartia'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is a help page.',
        title: 'Help Page',
        name: 'Vinayak Bhartia'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "You must provide address"
        })
    }
    const address = req.query.address
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(latitude, longitude, (error, {Description, Temperature} = {}) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                Description,
                Temperature
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Vinayak Bhartia',
        errorMessage: 'Help Article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404 Error Page',
        errorMessage: '404 Not Found!',
        name: 'Vinayak Bhartia'
    })
})

app.listen(3002, () => {
    console.log('Server is up on port 3002.')
})