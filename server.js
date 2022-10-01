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

const port = process.env.PORT || 8000;

// schema per data type

// User
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    userId: String,
    postIds: [String]
});
const Users = mongoose.model('users', userSchema)

// deliveryType - Vertual or in-person
const deliveryTypeSchema = new mongoose.Schema({
    deliveryType: String,
})
const deliveryTypes = mongoose.model('deliveryTypes', deliveryTypeSchema);

// typeOfEvent
const eventTypeSchema = new mongoose.Schema({
    eventType: String,
})
const eventTypes = mongoose.model('eventTypes', eventTypeSchema);

// Locations
const sapLocationSchema = new mongoose.Schema({
    sapLocation: String,
})
const sapLocations = mongoose.model('sapLocations', sapLocationSchema);

// Posts
const postSchema = new smongoose.Schema({
    postId: String,
    userId: [Users.userId],
    title: String,
    location: { String },
    description: String,
    comment: {
        "postId": postId,
        "content": String,
        "userId": userId,
        "Date": Date.now(),
    },
    likes: Boolean,
    eventTime: String,
    deliveryType: [deliveryTypes.deliveryType],
    sapLocation: [sapLocations.sapLocation],
})
const Posts = mongoose.model('posts', postSchema);

// title of events
const eventTitleSchema = new mongoose.Schema({
    evenTitle: String
})
const evenTitles = mongoose.model('evenTitles', eventTitleSchema);

// EventImages
const eventImageSchema = new mongoose.Schema({
    image: String,
    name: String
})
const eventImages = mongoose.model('eventImages', eventImageSchema);

app.put('/api/assets', (req, res) => {
    const targetId = req.body._id;
    var newValues = { $set: { name: req.body.name } }
    Assets.updateOne({ "_id": targetId }, newValues).then(() => {
        res.status(200);
        res.json({ "status": "ok" });
    }).catch(err => {
        res.status(500);
        res.json({ "status": "error", "msg": err.message });
    });;
})

app.delete('/api/assets', (req, res) => {
    const targetId = req.query.id;
    if (targetId && targetId != "") {
        Assets.deleteOne({ "_id": targetId }).then(() => {
            res.status(200);
            res.json({ "status": "ok" });
        }).catch(err => {
            res.status(500);
            res.json({ "status": "error", "msg": err.message });
        });
    } else {
        res.status(500);
        res.json({ "status": "error" });
    }
})

// ==============EventImages CRUD functions==============
// To avoid the call conflict with the front end, we add '/api' ex. '/api/scheduler'
app.get('/api/assets', (req, res) => {
    // .query = asking for query parameter '?'
    if (req.query.name && req.query.name != "") {
        Assets.find({ name: req.query.name }).then(results => {
            res.status(200);
            res.json(results);
        }).catch(err => {
            res.status(500);
            res.json({ "status": "error", "msg": err.message });
        });;
    } else {
        Assets.find().then(results => {
            res.status(200);
            res.json(results);
        });
    }
})

app.post('/api/assets', (req, res) => {
    const newAsset = Assets();
    newAsset.name = req.body.name;
    newAsset.save().then(() => {
        res.status(200);
        res.json({ "status": "ok" });
    }).catch(err => {
        res.status(500);
        res.json({ "status": "error", "msg": err.message });
    });;
})

app.put('/api/assets', (req, res) => {
    const targetId = req.body._id;
    var newValues = { $set: { name: req.body.name } }
    Assets.updateOne({ "_id": targetId }, newValues).then(() => {
        res.status(200);
        res.json({ "status": "ok" });
    }).catch(err => {
        res.status(500);
        res.json({ "status": "error", "msg": err.message });
    });;
})

app.delete('/api/assets', (req, res) => {
    const targetId = req.query.id;
    if (targetId && targetId != "") {
        Assets.deleteOne({ "_id": targetId }).then(() => {
            res.status(200);
            res.json({ "status": "ok" });
        }).catch(err => {
            res.status(500);
            res.json({ "status": "error", "msg": err.message });
        });
    } else {
        res.status(500);
        res.json({ "status": "error" });
    }
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