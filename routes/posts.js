 const express = require("express"); 
const router = express(); 


const Post = require("../models/post"); 


// middleware for finding post by id
let findById = async (req, res, next) => {
  let post;
  try {
    post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({
        message_type: "warning",
        message: "could not find a post",
    });
    return
    }
  } catch (error) {
    res.status(500).json({
            message_type: "error",
            message: "Internal server error",
            error: error
        });
  }
  res.post = post;
  next();
};

// GET all of the instances of a certain model
router.get("/", async (req, res) => { 

    const posts = await Post.find()
    try{
        if(posts) {
            res.status(201).json({
                message_type: "success",
                message: "good response",
                posts:posts
              });
        } else {
            res.status(404).json({
                message_type: "warning",
                message: "could not find a post",
            }); 
        }
        
    } catch (error) {
        res.status(500).json({
            message_type: "error",
            message: "Internal server error",
            error: error
        });
    } 

}) 


// GET a single instance of a certain model by id
router.get("/:id",findById, async (req, res) => { 

 
  try{
      res.status(201).json({
          message_type: "success",
          message: "good response",
          post: res.post
      });
  } catch (error) {
      res.status(500).json({
          message_type: "error",
          message: "Internal server error",
          error: error
      });
  } 

}) 



// POST a single new instance of a certain model
router.post("/", async (req, res) => {
  const post = await new Post({
    title : req.body.title
  })

  try {
    const new_post = await post.save();
    if(new_post) {
      res.status(201).json({
        message_type: "success",
        message: "good response",
        post: new_post
    });
    } else {
      res.status(500).json({
        message_type: "error",
        message: "could not save to database"
      })
    }
    
  } catch (error) {
    res.status(500).json({
      message_type: "error",
      message: "Internal server error",
      error: error
    });
  }
})

// PATCH a single instance of a certain model
router.patch(
  "/:id",
  findById,
  async (req, res) => {

    if (req.body.title != null) { 
      res.post.title = req.body.title;
    }

    try {
      const updated_post = await res.post.save();

      if (updated_post) {
        res.status(201).json({
          message_type: "success",
          message: "good response",
          post: updated_post
        });
      } else {
        res.status(500).json({
          message_type: "error",
          message: "could not save to database"
        })
      }
    } catch (error) {
      res.status(500).json({
        message_type: "error",
        message: "Internal server error",
        error: error
      });
    }
  }
);

// DELETE a single instance of a certain model
router.delete("/:id", async (req, res) => {
  try {
    let deleted = await Post.findOneAndDelete(req.params.id);
    if (deleted) {
      res.status(201).json({
        message_type: "success",
        message: "post deleted",
      });
    } else {
      res.status(404).json({
        message_type: "error",
        message: "could not find post",
      });
    }

  } catch (error) {
    res.status(500).json({
      message_type: "error",
      message: "Internal server error",
      error: error
    });
  }
});

module.exports = router;
  