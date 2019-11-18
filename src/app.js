const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDir))
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Pik Mik'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Pik Mik'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Pikmik',
        title: 'Help',
        name: 'Pik Mik'
    })
})

app.get('/weather', async (req, res) => {
    if (!req.query.address) {
        return res.json({
            success: false,
            message: 'You must provide an address'
        })
    }

    try {
        let geo = await geocode.getCode(req.query.address)
        let forecast = await weather.getWeather(geo.latitude, geo.longitude)

        return res.json({
            forecast: forecast,
            location: geo.location
        })
    } catch (err) {
        return res.json({
            success: false,
            message: err.message
        })
    }
})

app.get('help/*', (req, res) => {
    res.render('404', {
        title: '404 help',
        name: 'PikMik',
        errorMessage: 'Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'PikMik',
        errorMessage: 'Page not found'
    })
})

app.listen('3000', () => {
    console.log('Server is up on port')
})