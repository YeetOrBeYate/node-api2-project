const express = require('express');
const db = require("../data/db");

const commentRouter = express.Router();

commentRouter.get("/:id", (req,res)=>{
    const id = req.params.id;

    db.findCommentById(id)
    .then((comment)=>{
        res.status(200).json({comment})
    })
    .catch(err=>{
        res.status(404).json({err})
    })
})


module.exports = commentRouter;