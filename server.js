const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://root:hackathonsap@cluster0.x2vyrua.mongodb.net/data?retryWrites=true&w=majority');
    // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

const path = require("path");

const port = process.env.PORT || 8080;

// Examples
// schema per data type
const assetSchema = new mongoose.Schema({
    name: String
});
const Assets = mongoose.model('assets', assetSchema)

// To avoid the call conflict with the front end, we add '/api' ex. '/api/scheduler'
app.get('/api/assets', (req, res) => {
    Assets.find().then(results => {
        res.json(results);
    });
})
app.post('/api/assets', (req, res) => {
    const newAsset = Assets();
    newAsset.name = req.body.name;
    newAsset.save().then(() => {
        res.json({ "status": "ok" });
    });
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