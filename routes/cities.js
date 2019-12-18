const express = require('express')
const router = express.Router()

const mbxClient = require('@mapbox/mapbox-sdk')
const mbxGeocode = require('@mapbox/mapbox-sdk/services/geocoding')
const db = require('../models')

const mb = mbxClient({ accessToken: 'pk.eyJ1Ijoia2VubmFuc2FsaXNidXJ5IiwiYSI6ImNrNGFqMWdwNTA0Z3czbm81Y3ppdzg5ZXgifQ.oncPXKO7Aq-jIZ5vhUGH7A'})
const geocode = mbxGeocode(mb)


router.get('/search', (req, res) => {
    res.render('cities/search')
} )

router.get('/results', (req, res) => {
    geocode.forwardGeocode({ //these are the things we want to pass through the api
        query: `${req.query.city}, ${req.query.state}`,
        types: ['place'],
        countries: ['us']
    })
    .send()
    .then(result => {
        let results = result.body.features.map(result => { //these are the data points that come through from the api
            return{
                city: result.place_name,
                lat: result.center[1],
                long: result.center[0]
            }
        })
        res.render('cities/results', { query: req.query, results})
        console.log(results)
    })
})

router.post('/add', (req, res) => {
    db.place.findOrCreate({
        where: {
            city: req.body.city
        },
        defaults: {
            lat: req.body.lat,
            long: req.body.long
        }
    })
    .then(([city, created]) => {
        console.log(`${city.city} was ${created ? 'created' : 'found'}`)
        res.redirect('/favorites')
    })
})

router.get('/favorites', (req, res) => {
    db.place.findAll()
    .then(cities => {
        res.render('cities/favorites', {cities})
    })
})

module.exports = router