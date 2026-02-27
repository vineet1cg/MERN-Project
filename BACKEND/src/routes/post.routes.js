const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadFile = require('../services/storage.service');
const postModel = require('../models/post.model');

// for input fields that require more than text data 
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// creating a post
router.post('/create-post', upload.single("image"), async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }

        const result = await uploadFile(req.file.buffer);
        const post = await postModel.create({
            image: result.url,
            caption: req.body.caption
        });

        return res.status(201).json({
            success: true,
            data: post
        });
    } catch (error) {
        next(error);
    }
});

// see all posts 
router.get('/', async (req, res, next) => {
    try {
        const posts = await postModel.find().sort({ createdAt: -1 }); // Sorting posts
        return res.status(200).json({
            success: true,
            data: { posts }
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
