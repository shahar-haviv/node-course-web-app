const path = require('path')
const request = require('request')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

// env veribels
const port = process.env.PORT || 3000

const app = express()
// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../tamplates/views')
const partialsPath = path.join(__dirname, '../tamplates/partials')

//set up handler engine views and partials
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialsPath)

//set up static websites
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        name: 'shahar haviv',
        title: 'weather'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        name: 'shahar haviv',
        title: 'about-me'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'shahar  haviv',
        title: 'help',
        helpText: 'this is very importent help msg'
    })
})

app.get('/product', (req, res) => {
    console.log(req.query.search)
    if (!req.query.search) {
        return res.send('no search term was used')
    }

    res.send({
        product: ['games', 'boxes', 'tankes'],
        names: ['bob', 'bark', 'mendi']
    })
})

app.get('/whether', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'no addres was given'
        })
    }
    const adress = req.query.address
    geocode(adress, (error, { latitude, longitude, place_name } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forcast(latitude, longitude, (error, dataforcats) => {
            if (error) return res.send({ error })
            if (dataforcats) {
                res.send({
                    data: dataforcats,
                    location: place_name,
                    address: req.query.address,
                    img: dataforcats[1]
                })
            }
        })

    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'shahar haviv',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'shahar haviv',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('app listen on port ', port)
}) 