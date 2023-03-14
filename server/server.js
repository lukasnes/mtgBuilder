const express = require('express')
const cors = require('cors')
const path = require('path')
const mtg = require('mtgsdk')

const app = express()

app.use(express.json())
app.use(express.static('public'))
app.use(cors())

app.get('/', (req,res) => {
    res.status(200).sendFile(path.join(__dirname, '../public/html/home.html'))
})
app.get('/js', (req,res) => {
    res.status(200).sendFile(path.join(__dirname, '../public/js/main.js'))
})
app.get('/css', (req,res) => {
    res.status(200).sendFile(path.join(__dirname, '../public/css/styles.css'))
})
app.get('/test', (req,res) => {
    mtg.card.where({ supertypes: 'legendary', subtypes: 'goblin' })
    .then(cards => {
        console.log(cards[0].name) // "Squee, Goblin Nabob"
    })
        .catch(err => console.log(err))
})


app.listen(4000, console.log('Server running on 4000'))