const express = require("express")
const BodyParser = require("body-parser")
const Https = require("https")

const app = express()
const port = 3000

app.use(express.static(__dirname + "/public"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.use(BodyParser.urlencoded({ extended: true })) // parses post request
app.post("/", (req, res) => {

    // catches user credentials
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let email = req.body.email

    res.write(`<p>First Name: ${firstName}, Last Name: ${lastName}, Password: ${email}</p>`)
})


app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})