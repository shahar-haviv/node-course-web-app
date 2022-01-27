const request = require('request')

const geocode = (addres, callback) => {

    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + addres + '.json?access_token=pk.eyJ1IjoiYmFtYmFiaXNsaTExMiIsImEiOiJja3lsb3Ntc2YycmF3MnVxaHhwcmdmbmVjIn0.5DT2ojh3njdJVL56w-zRRA&limit=1'

    request({ url: geocodeURL, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!')
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                place_name: body.features[0].place_name
            })

        }
    })

}

module.exports = geocode