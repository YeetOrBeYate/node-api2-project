const express = require('express')
const PostRouter = require('./Routers/PostRouter');
const CommentRouter = require("./Routers/CommentRouter");


const app = express();
app.use(express.json())


app.use('/posts', PostRouter);
app.use('/comments', CommentRouter);


const port = 8080;

app.listen(port, ()=>{console.log("app listeing on port 8080")})
