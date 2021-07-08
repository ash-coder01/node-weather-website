const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidWV3aWZqa2NuYXNrbmQiLCJhIjoiY2txdHBseWlxMDB3MDJ4bzN5Yjh2ZnUxayJ9.VJt4Zvy5xE8zRdKNwk28Jg'
    //to include special chaarcters the encode thingy
    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('unable to connect to location services', undefined)
        }
        else if(response.body.features.length === 0) {
            callback('unable to find location', undefined)
        }
        else{
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports=geocode