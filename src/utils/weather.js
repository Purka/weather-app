'use strict'
const axios = require('axios')

module.exports.getWeather = async (latitude, longitude) => {
    const url = 'https://api.darksky.net/forecast/c5798bbf8e004f15e8c0929f094d419f/' + latitude + ',' + longitude + '?units=si'

    try {
        let { data } = await axios.get(url)

        let weather = data.currently.summary + ". The temperature is " + data.currently.temperature + " degrees. Percip Probability is " + data.currently.precipProbability + "%"

        return weather
    } catch (e) {
        return console.log('Could not connect to the server')
    }
}