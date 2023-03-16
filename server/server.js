const express = require('express')
const cors = require('cors')
const path = require('path')
const mtg = require('mtgsdk')

const app = express()

app.use(express.json())
app.use(express.static('public'))
app.use(cors())

const { getFilteredCards } = require('./controller.js')

app.get('/', (req,res) => {
    res.status(200).sendFile(path.join(__dirname, '../public/html/home.html'))
})
app.get('/js', (req,res) => {
    res.status(200).sendFile(path.join(__dirname, '../public/js/main.js'))
})
app.get('/css', (req,res) => {
    res.status(200).sendFile(path.join(__dirname, '../public/css/styles.css'))
})
app.post('/cards', getFilteredCards)


app.listen(4000, console.log('Server running on 4000'))