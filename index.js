const express = require('express')
const path = require('path')
const app = express()

app.get('/start', (req, res) => {
    res.send('hello world!')
})

app.listen(3000)