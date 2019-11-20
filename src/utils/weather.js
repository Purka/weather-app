'use strict'
const axios = require('axios')

module.exports.getWeather = async (latitude, longitude) => {
    const url = 'https://api.darksky.net/forecast/c5798bbf8e004f15e8c0929f094d419f/' + latitude + ',' + longitude + '?units=si&lang=uk'

    try {
        let { data } = await axios.get(url)

        let weather = {
            summary: data.daily.data[0].summary,
            temperature: data.currently.temperature,
        }

        return weather
    } catch (e) {
        console.log(e)
        return console.log('Could not connect to the server')
    }
}