// Require Express.js
const express = require('express')
const app = express()

// Get port
const args = require("minimist")(process.argv.slice(2))
args["port"]
if (args.port == undefined) { args.port = 5000 }
var port = args.port

// 1. server.js file that takes an arbitrary port number as a command line argument (i.e. I should be able to run it with node server.js. The port should default to 5000 if no argument is given.
const server = app.listen(port, () => {
    console.log("App is running on port %PORT%".replace("%PORT%", port))
})


// 3. Check endpoint at /app/ that returns 200 OK
app.get("/app", (req, res) => {
    // Respond with status 200
    res.status(200).end("200 OK")
    //res.type("text/plain")
})

// 4. Endpoint /app/flip/ that returns JSON {"flip":"heads"} or {"flip":"tails"} corresponding to the results of the random coin flip
function coinFlip() {
    return Math.random() > 0.5 ? ("heads") : ("tails")
}
app.get("/app/flip", (req, res) => {
    res.status(200).json({ "flip" : coinFlip() })
})

// 5. Endpoint /app/flips/:number that returns JSON including an array of the raw random flips and a summary. Example below.
function coinFlips(flips) {
    const record = []
    for (let i = 0; i < flips; i++) {
      record[i] = coinFlip()
    }
    return record
}
function countFlips(array) {
    let count = { heads: 0, tails: 0 }
  
    for (let i = 0; i < array.length; i++) {
      if (array[i] == "heads") {
        count.heads++
      } else {
        count.tails++
      }
    }
  
    return count
  }
app.get("/app/flips/:number", (req, res) => {
    var array = coinFlips(req.params["number"])
    res.status(200).json({ "raw" : array, "summary" : { "tails" : countFlips(array).tails, "heads" : countFlips(array).heads }})
})


// 2. Default API endpoint that returns 404 Not found for any endpoints that are not defined
app.use(function(req, res) {
    res.status(404).send("404: Endpoint does not exist")
    res.type("text/plain")
})