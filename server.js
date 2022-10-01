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
const deliveryTypes = mongoose.model('delivery_types', deliveryTypeSchema);

// typeOfEvent
const eventTypeSchema = new mongoose.Schema({
    eventType: String,
})
const eventTypes = mongoose.model('event_types', eventTypeSchema);

// Locations
const sapLocationSchema = new mongoose.Schema({
    sapLocation: String,
})
const sapLocations = mongoose.model('sap_locations', sapLocationSchema);


// Posts
// const postSchema = new mongoose.Schema({
//     postId: String,
//     userId: [Users.userId],
//     title: String,
//     location: { String },
//     description: String,
//     comment: {
//         "postId": String,
//         "content": String,
//         "userId": [Users.userId],
//         "Date": Date.now(),
//     },
//     likes: Boolean,
//     eventTime: String,
//     deliveryType: [deliveryTypes.deliveryType],
//     sapLocation: [sapLocations.sapLocation],
// })
// const Posts = mongoose.model('posts', postSchema);

// Comments
// const commentSchema = new mongoose.Schema({
//     comment: String,
//     createdTime: Date.now(),
//     userId: [Users.userId],
//     postId: [Posts.postId],

// })
// const comments = mongoose.model('comments', commentSchema);

// // title of events
// const eventTitleSchema = new mongoose.Schema({
//     evenTitle: String
// })
// const evenTitles = mongoose.model('evenTitles', eventTitleSchema);

// EventImages
const eventImageSchema = new mongoose.Schema({
    image: String,
    name: String
})
const eventImages = mongoose.model('event_images', eventImageSchema);

// User CRED
app.get('/api/users', (req, res) => {
    // .query = asking for query parameter '?'
    if (req.query.name && req.query.name != "") {
        Users.find({ name: req.query.name }).then(results => {
            res.status(200);
            res.json(results);
        }).catch(err => {
            res.status(500);
            res.json({ "status": "error", "msg": err.message });
        });;
    } else {
        Users.find().then(results => {
            res.status(200);
            res.json(results);
        });
    }
})

// Posts CRED
// Deliver_types CRED
// Event_images CRED
// Event_types CRED
// Locations CRED
// Events CRED
// EventImages CRED


// Otherwise, go to the FE
app.listen(port, (err) => {
    if (err) return console.loge(err);
    console.log("Server running on port: ", port);
})