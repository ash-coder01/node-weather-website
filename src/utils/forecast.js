const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=833be30b6244058dc11bd5e5bb0beebc&query=' + latitude + ',' + longitude
//    http://api.weatherstack.com/current?access_key=833be30b6244058dc11bd5e5bb0beebc&query=37.8267,-122.4233
    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('cannot connect to weather services', undefined)
        }
        else if(response.body.error){
            callback('Unable to find location', undefined)
        }
        else{
            callback(undefined, ' The temperature is currently ' + response.body.current.temperature + '. But it feels like ' + response.body.current.feelslike)
        }
    })
}

module.exports=forecast