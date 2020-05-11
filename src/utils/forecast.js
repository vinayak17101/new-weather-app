const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&appid=2ba3af9eb0c90dc4ca6c322575f1c3fe&units=metric' 
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                Description: body.current.weather[0].description,
                Temperature: body.current.temp
            })
        }
    })
}

module.exports = forecast