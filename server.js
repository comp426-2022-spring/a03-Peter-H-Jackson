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

// Default response for any other request
app.use(function(req, res) {
    res.status(404).send("404: Endpoint does not exist")
    res.type("text/plain")
})

/*
app.get("/app/", (req, res) => {
    // Respond with status 200
    res.statusCode = 200
    // Respond with status message "OK"
    res.statusMessage = "OK"
    res.writeHead(res.statusCode, { "Content-Type" : "text/plain" })
    res.end(res.statusCode, + " " + res.statusMessage)
})
*/