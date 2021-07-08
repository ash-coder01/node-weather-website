//video 45
const path = require('path')

//video 43
const express = require('express')

//video 49
const hbs = require('hbs')

//video 55
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()//make the application



//video 45 serving static assets
//define parhs
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')//video 48,49
const partialsPath = path.join(__dirname, '../templates/partials')//video 49
//app.use(express.static(publicDirectoryPath))
//express works until it finds a match


//video 47
//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)//video 48
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))//above same line

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew'//do using ejs, dynamic
    }) //redering hbs file, works only after removing/deleting html file
})

//what server should do when someone visits the url in ''
//app.get('', (req, res) => {
    //res.send('Hello express') //sending response
  //  res.send('<h1>Weather</h1>')
//})

app.get('/help', (req, res) => {
    //res.send('Help page') //sending response in text
    //res.send({
    //    name: 'Ash',
    //    age: 19
    //},{
    //    name:'ann',
    //    age: 20
    //}) sending response in json obj
    res.render('help', {
        title: 'Help',
        text: 'This application tells you weather at various places around the world.',
        name: 'Ash'
    })
})

app.get('/about', (req, res) => {
    //res.send('About Page')
    //res.send('<h2>About Page</h2>')
    res.render('About', {
        title: 'About me',
        name: 'Ash'
    })
})

app.get('/weather', (req, res) => {
    //res.send('Your weather app')

    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) =>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location: location, 
                address: req.query.address
            })
        })
    })
    // res.send({
    //     location: 'philadelphia',
    //     forecast: 'it is snowing',
    //     address: req.query.address
    // })
})


//video 54
//sending query: in url after '?' 
// app.get('/products', (req, res) => {
//     if(!req.query.search){
//         //runs when no search term
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }//checks whether we have an address or not
//     console.log(req.query)
//     res.send({
//         products: []
//     })
// })
//update weather end point to accept address


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ash',
        errormsg: 'there is an error'
    })
})


//to start the server
app.listen(3000 , () => {
    console.log('server is up on port')
})

//run this in browser by opening url localhost:3000

//video 47 
//hbs in views folder
//similar to ejs

//video 55 
//copied utils here
//