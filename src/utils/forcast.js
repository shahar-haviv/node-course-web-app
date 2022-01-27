const request = require('request')

const forcast = (latitude,longitude, callback)=> {
    const url = 'http://api.weatherstack.com/current?access_key=53314558255103c755c3add2ab9da6dd&query='+latitude+ ',' +longitude+'&units=m'
    
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback({error:'Unable to connect to weather service!'})
        } else if (body.error) {
            callback({error:'Unable to find location'})
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out.")
        }
    })
    
}


module.exports = forcast