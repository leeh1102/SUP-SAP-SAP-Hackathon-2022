const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://root:hackathonsap@cluster0.x2vyrua.mongodb.net/data?retryWrites=true&w=majority');
    console.log("Connected to mongodb");
    // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

const path = require("path");
const { StringDecoder } = require("string_decoder");
// const { AddAPhoto } = require("@mui/icons-material");

const port = process.env.PORT || 8080;

// schema per data type
// User
const userSchema = new mongoose.Schema({
    userName: String,
    password: String
});
const Users = mongoose.model('users', userSchema)

// Posts
const postSchema = new mongoose.Schema({
    userId: String,
    title: String,
    location: String,
    description: String,
    comment: [{
        postId: String,
        content: String,
        userId: String,
        createdAt: Date,
    }],
    likes: Number,
    startTime: String,
    endTime: String,
    deliveryType: String,
    sapLocation: String,
    postCreatedAt: String,
    isAmenity: Boolean,
    eventDate: String,
    postOwner: String

})
const Posts = mongoose.model('posts', postSchema);

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
        });
    } else {
        Users.find().then(results => {
            res.status(200);
            res.json(results);
        });
    }
})
app.post('/api/users', (req, res) => {
    const newUser = Users();
    newUser.userName = req.body.userName;
    newUser.password = req.body.password;
    newUser.save().then(() => {
        res.status(200);
        res.json({ "status": "ok" });
    }).catch(err => {
        res.status(500);
        res.json({ "status": "error", "msg": err.message });
    });
})
// Posts CRED
app.get('/api/posts', (req, res) => {
    if (req.query.postId && req.query.postId != "") {
        Posts.find({ postId: req.query.postId }).then(results => {
            res.status(200);
            res.json(results);
        }).catch(err => {
            res.status(500);
            res.json({ "status": "error", "msg": err.message });
        });
    } else if (req.query.userId && req.query.userId != "") {
        // /api/posts?userId=123123dkfjei
        Posts.find({ userId: req.query.userId }).then(results => {
            res.status(200);
            res.json(results);
        }).catch(err => {
            res.status(500);
            res.json({ "status": "error", "msg": err.message });
        });
    }
    else {
        Posts.find().then(results => {
            res.status(200);
            res.json(results);
        });
    }
})


app.post('/api/posts', (req, res) => {
    const newPost = Posts();
    newPost.userId = req.body.userId;
    newPost.title = req.body.title;
    newPost.location = req.body.location;
    newPost.description = req.body.description;
    newPost.comment = [];
    newPost.likes = 0;
    newPost.deliveryType = req.body.deliveryType;
    newPost.sapLocation = req.body.sapLocation;
    newPost.startTime = req.body.startTime;
    newPost.endTime = req.body.endTime;
    newPost.isAmenity = req.body.isAmenity;
    newPost.eventDate = req.body.eventDate;
    newPost.postCreatedAt = new Date();
    newPost.save().then(() => {
        res.status(200);
        res.json({ "status": "ok" });
    }).catch(err => {
        res.status(500);
        res.json({ "status": "error", "msg": err.message });
    });;
})


// creating likes increments
app.post('/api/likes', (req, res) => {
    if (req.query.postId && req.query.postId != "") {
        Posts.findOne({ postId: req.query.postId }).then(result => {
            result.likes += 1;
            Posts.findOneAndUpdate({ _id: req.query.postId }, result).then(() => {
                res.status(200);
                res.json({ "status": "ok" });
            }).catch(err => {
                res.status(500);
                res.json({ "status": "error", "msg": err.message });
            });
        }).catch(err => {
            res.status(500);
            res.json({ "status": "error", "msg": err.message });
        });
    } else {
        Posts.find().then(results => {
            res.status(200);
            res.json(results);
        });
    }
})

// Comments CRED
app.post('/api/comments', (req, res) => {
    Posts.findOne({ _id: req.body.postId }).then(result => {
        const newComment = {};
        newComment.content = req.body.content;
        newComment.createdAt = new Date();
        newComment.userId = req.body.userId;
        result.comment.push(newComment);
        result.save().then(() => {
            res.status(200);
            res.json({ "status": "ok" });
        }).catch(err => {
            res.status(500);
            res.json({ "status": "error", "msg": err.message });
        });
    }).catch(err => {
        res.status(500);
        res.json({ "status": "error", "msg": err.message });
    });
})

app.put('/api/comments', (req, res) => {
    Posts.findOne({ _id: req.body.postId }).then(result => {
        if (result != null) {
            const commentIndex = result.comment.findIndex(element => element._id == req.body._id);
            if (commentIndex >= 0) {
                result.comment[commentIndex].content = req.body.content;
                result.save().then(() => {
                    res.status(200);
                    res.json({ "status": "ok" });
                }).catch(err => {
                    res.status(500);
                    res.json({ "status": "error", "msg": err.message });
                });
            } else {
                res.status(500);
                res.json({ "status": "error", "msg": "Post cannot be found" });
            }
        } else {
            res.status(500);
            res.json({ "status": "error", "msg": err.message });
        }
    }).catch(err => {
        res.status(500);
        res.json({ "status": "error", "msg": err.message });
    });
})

app.delete('/api/comments', (req, res) => {
    const targetPostId = req.query.postId;
    const targetCommentId = req.query.commentId;
    if (targetPostId && targetPostId != "" && targetCommentId && targetCommentId != "") {
        Posts.findOne({ _id: targetPostId }).then(result => {
            if (result != null) {
                const commentIndex = result.comment.findIndex(element => element._id == targetCommentId);
                result.comment.splice(commentIndex, 1)
                if (commentIndex >= 0) {
                    result.save().then(() => {
                        res.status(200);
                        res.json({ "status": "ok" });
                    }).catch(err => {
                        res.status(500);
                        res.json({ "status": "error", "msg": err.message });
                    });
                } else {
                    res.status(500);
                    res.json({ "status": "error", "msg": "Post cannot be found" });
                }
            } else {
                res.status(500);
                res.json({ "status": "error", "msg": err.message });
            }
        }).catch(err => {
            res.status(500);
            res.json({ "status": "error", "msg": err.message });
        });
    } else {
        res.status(500);
        res.json({ "status": "error" });
    }
})




// Event_images CRED
app.get('/api/event_images', (req, res) => {
    if (req.query.name && req.query.name != "" && req.query.image && req.query.image != "") {
        EventImages.find({ name: req.query.image }).then(results => {
            res.status(200);
            res.json(results);
        }).catch(err => {
            res.status(500);
            res.json({ "status": "error", "msg": err.message });
        });;
    } else {
        EventImages.find().then(results => {
            res.status(200);
            res.json(results);
        });
    }
})

app.post('/api/event_images', (req, res) => {
    const newEventImage = EventImages();
    newEventImage.name = req.body.name;
    newEventImage.image = req.body.image;
    newEventImage.save().then(() => {
        res.status(200);
        res.json({ "status": "ok" });
    }).catch(err => {
        res.status(500);
        res.json({ "status": "error", "msg": err.message });
    });;
})

// Event titles CRED
app.get('/api/event_titles', (req, res) => {
    // .query = asking for query parameter '?'
    if (req.query.eventTitle && req.query.eventTitle != "") {
        EventTitles.find({ eventTitle: req.query.eventTitle }).then(results => {
            res.status(200);
            res.json(results);
        }).catch(err => {
            res.status(500);
            res.json({ "status": "error", "msg": err.message });
        });;
    } else {
        EventTitles.find().then(results => {
            res.status(200);
            res.json(results);
        });
    }
})

app.post('/api/event_titles', (req, res) => {
    const newEventTitle = EventTitles();
    newEventTitle.eventTitle = req.body.eventTitle;
    newEventTitle.save().then(() => {
        res.status(200);
        res.json({ "status": "ok" });
    }).catch(err => {
        res.status(500);
        res.json({ "status": "error", "msg": err.message });
    });
})

app.put('/api/event_titles', (req, res) => {
    const targetId = req.body._id;
    var newValues = { $set: { eventTitle: req.body.eventTitle } }
    EventTitles.updateOne({ "_id": targetId }, newValues).then(() => {
        res.status(200);
        res.json({ "status": "ok" });
    }).catch(err => {
        res.status(500);
        res.json({ "status": "error", "msg": err.message });
    });
})

app.delete('/api/event_titles', (req, res) => {
    const targetId = req.query.id;
    if (targetId && targetId != "") {
        EventTitles.deleteOne({ "_id": targetId }).then(() => {
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

// Otherwise, go to the FE
app.listen(port, (err) => {
    if (err) return console.loge(err);
    console.log("Server running on port: ", port);
})