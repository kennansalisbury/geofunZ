const express = require('express')
const layouts = require('express-ejs-layouts')

const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended : false}))
app.use(express.static('static'))
app.use(layouts)

app.get('/', (req, res) => {
    res.render('home')
})

app.use('/', require('./routes/cities'))

app.listen(8000, () => {
    console.log('Listening 🎧')
})