const express = require('express');
const db = require("../data/db");

const postRouter = express.Router();

postRouter.get('/', (req,res)=>{
    db.find()
    .then((posts)=>{
        res.status(200).json({posts})
    })
    .catch((err)=>{
        res.status(500).json({err})
    })
})

postRouter.get("/:id", (req,res)=>{
    const id = req.params.id;
    db.findById(id)
    .then((post)=>{
        res.status(200).json({post})
    })
    .catch((err)=>{
        res.status(404).json({err})
    })
})

postRouter.post("/", (req,res)=>{
    const post = req.body;
    console.log(post)
    db.insert(post)
    .then((posty)=>{
        res.status(200).json({posty})
    })
    .catch((err)=>{
        res.status(500).json({err})
    })
})

postRouter.put("/:id", (req,res)=>{
    const body = req.body;
    const id = req.params.id;

    db.update(id, body)
    .then(post=>{
        res.status(200).json({post})
    })
    .catch(err=>{
        res.status(404).json({err})
    })
})

postRouter.delete('/:id', (req, res)=>{
    const id = req.params.id;

    db.remove(id)
    .then(post=>{
        res.status(200).json({message:'post deleted'})
    })
    .catch(err=>{
        res.status(404).json({err})
    })
})

postRouter.get('/:id/comments', (req, res)=>{
    const id = req.params.id;
    db.findPostComments(id)
    .then(comments=>{
        res.status(201).json({comments})
    })
    .catch(err=>{
        res.status(500).json({err})
    })
})

postRouter.post('/:id/comments', (req, res)=>{
    const id = req.params.id;
    const comment = req.body;

    db.findById(id)
    .then(post=>{
        if(post.length===0){
            res.status(404).json({message:"something not there"})
        }
    })

    db.insertComment(comment)
    .then((comment)=>{
        res.status(201).json({comment})
    })
    .catch(err=>{
        res.status(500).json({err})
    })
    

})


module.exports = postRouter;