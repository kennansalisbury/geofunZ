// const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
// const geocoding = mbxGeocoding({ accessToken: 'pk.eyJ1Ijoia2VubmFuc2FsaXNidXJ5IiwiYSI6ImNrNGFqMWdwNTA0Z3czbm81Y3ppdzg5ZXgifQ.oncPXKO7Aq-jIZ5vhUGH7A'})

// geocoding.forwardGeocode( {
//     query: 'Seattle, WA'
// })
// .send()
// .then(res => {
//     let match = res.body
//     console.log(match.features[0].center)
// })

// geocoding.reverseGeocode({
//     query: [-122.3301, 47.6038]
// })
// .send()
// .then(res => {
//     let match = res.body
//     console.log(match)
// })