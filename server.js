const express = require("express");
const app = express();

const path = require("path");

const port = process.env.PORT || 8080;

// To avoid the call conflict with the front end, we add '/api' ex. '/api/scheduler'
app.get('/api', (req, res) => {
    res.json("hello api")
})

if (process.env.NODE_ENV === "production") {
    app.use(express.static('build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    })
}

// Otherwise, go to the FE
app.listen(port, (err) => {
    if (err) return console.loge(err);
    console.log("Server running on port: ", port);
})