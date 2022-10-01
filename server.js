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

// Examples
// schema per data type
const assetSchema = new mongoose.Schema({
    name: String
});
const Assets = mongoose.model('assets', assetSchema);

// User
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    userId: String,
    postIds: [String]
});
const Users = mongoose.model('users', userSchema)

// Posts
const userSchema = new mongoose.Schema({
    username: String,
    password: String,

});
const Assets = mongoose.model('assets', assetSchema)

// EventImages
const eventImagesSchema = new mongoose.Schema({
    image: String,
    names: [String],
    types: [String]

});
const EventImages = mongoose.model('event_images', eventImagesSchema);


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