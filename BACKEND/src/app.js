const express = require('express');
const app = express();
const multer = require('multer');
const uploadFile = require('./services/storage.service');
const postModel = require('./models/post.model'); 
//middleware
// required for crud operations
app.use(express.json());
// for input fields that require more than text data 
const upload = multer({ storage:multer.memoryStorage() })
// basic route
app.get('/',(req,res)=>{
    res.send("Hello World");
    res.status(200).json({
        message:"Backend Running :D"
    });
});

// creating a post
app.post('/create-post',upload.single("image"),async(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    // user can add image and a caption
    const result = await uploadFile(req.file.buffer);
    const post = await postModel.create({
        image:result.url,
        caption:req.body.caption
    });
    return res.status(201).json({
        message : "Post Created Successfully",
        post
    })
});

// see all posts 
app.get('/posts',async(req,res)=>{
    
    // all posts
    const posts = await postModel.find()
    return res.status(200).json({
        message : "Post Fetched Successfully",
        posts
    })
})
module.exports = app;