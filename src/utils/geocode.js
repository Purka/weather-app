
'use strict'

const axios = require('axios')

module.exports.getCode = async (address) => {
    address = encodeURIComponent(address)
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicHVya2EiLCJhIjoiY2sycTk4N2pkMGJveTNjbG4zY3huOXF3dSJ9.ugHaAfyJqYeDpQzKKbm6zQ&limit=1'

    try {
        let { data } = await axios.get(url)

        if (data.features.length == 0) {
            throw new Error('City not found')
        }

        let responce = {
            location: data.features[0].place_name,
            latitude: data.features[0].center[1],
            longitude: data.features[0].center[0]
        }

        return responce
    } catch (e) {
        throw new Error(e.message)
    }
}