const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://Sayantandey001:sayantan@cluster0.bliggv8.mongodb.net/User-post-test?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('MongoDB Connected...');
}).catch((err) => {
    console.log('MongoDB Connection Error: ', err);
})

// MongoDB schema and model
const PostSchema = new mongoose.Schema({
    content: String
});

const Post = mongoose.model('Post', PostSchema);

// Routes
app.get('/posts', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

app.post('/posts', async (req, res) => {
    const post = new Post({
        content: req.body.content
    });
    await post.save();
    res.json(post);
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
