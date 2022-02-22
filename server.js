// Require Express.js
const express = require('express')
const app = express()

// Get port
const args = require("minimist")(process.argv.slice(2))
args["port"]
if (args.port == undefined) { args.port = 5000 }
var port = args.port

// Start an app server
const server = app.listen(port, () => {
    console.log("App is running on port %PORT%".replace("%PORT%", port))
})

app.get("/app", (req, res) => {
    // Respond with status 200
    res.status(200).end("OK")
    //res.type("text/plain")
})

function coinFlip() {
    return Math.random() > 0.5 ? ("heads") : ("tails")
}

app.get("/app/flip", (req, res) => {
    res.status(200).json({ "flip" : coinFlip() })
})

// Default response for any other request
app.use(function(req, res) {
    res.status(404).send("404: Endpoint does not exist")
    res.type("text/plain")
})