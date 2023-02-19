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

    // catches user credentials and puts it into the data const to be sent
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }    
            }
        ]
    }

    // converts data object to json
    const jsonData = JSON.stringify(data);

    const url = `https://us14.api.mailchimp.com/3.0/lists/8b135ea561`

    const options = {
        method: "POST",
        auth: "vsome:f4424deafe48805c27f3fff31d3c9d07-us14"
    }

    // requests data with given variables to mailchimp server
    const request = Https.request(url, options, (response) => {
    
        if ( response.statusCode === 200 ) {
            res.sendFile(__dirname + "/ok.html")
        } else {
            res.sendFile(__dirname + "/fail.html")
        }
        
        // shows data in console
        response.on("data", (data) => {
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData)
    request.end()
})

app.post("/fail", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})


app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})