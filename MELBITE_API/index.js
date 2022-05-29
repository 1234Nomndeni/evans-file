const express = require('express')
const request = require('request-promise')

const app = express()
const PORT = process.env.port || 5000

const apiKey = ""
const baseUrl = `https://api.scraperapi.com?api_key${apiKey}&autoparse=true`

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Testing Melbite API . . .")
})

app.get('/post/:postId', async (req, res) => {
    const {postId} = req.params

    try {
        const response = await request(`${baseUrl}&url=https://melbite.com/ps/${postId}`)
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }

})

app.listen(PORT, () => {
    console.log(`Checking up Melbite API ${PORT}`)
})