const express = require('express')
const app = express()
const config = require('./config')
const cors = require('cors')
const bodyParser = require('body-parser')

//Routes
const routes = [
    "players"
]

app.use(cors())
app.use(bodyParser.json())

app.get("/", (req, res) => res.send("Hello World!"))


routes.forEach(route => app.use(`/${route}`, require(`./routes/${route}`)))


const PORT_NUMBER = 5000 || config.port
app.listen(PORT_NUMBER, () => {
    console.log(`Server is listening on port ${PORT_NUMBER}`)
})