const http = require("http")

const fs = require("fs")

const args = require("minimist")(process.argv.slice(2))

args["port"]

const port = args.port || process.env.PORT || 5000

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader("Content-Type", "text/html")
    res.end("<p>ryann breslin is a cute girl that i love</p>")
})
  
server.listen(port, ()=> {
    console.log("Server running at port " + port)
})