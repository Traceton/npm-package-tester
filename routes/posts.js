const express = require("express");
const mongoose = require("mongoose");
const router = express();
const crypto = require("crypto");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const fileSizeLimit = 10000000;

// database
const mongoURI = process.env.DATABASE_URL;
// connection
const conn = mongoose.createConnection(mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

// init gfs
let gfs;

conn.on("error", (error) => {
  console.error(error);
});
conn.once("open", () => {
  console.log("posts router connection connected");
  // init gfs stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "postsPhotos",
  });
});



// create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = Math.random().toString();
        const fileInfo = {
          filename: filename,
          bucketName: "postsPhotos",
        };
        resolve(fileInfo);
      });
    });
  },
  options: {
    useUnifiedTopology: true,
  },
});
const upload = multer({
  storage,
  limits: { fileSize: fileSizeLimit },
});


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
  try {
    if (posts) {
      res.status(201).json({
        message_type: "success",
        message: "good response",
        posts: posts
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
router.get("/:id", findById, async (req, res) => {


  try {
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

// router.post(
//   "/",
//   upload.single("profilePic"),
//   checkIfUserExists,
//   async (req, res) => {
//     // make sure the account doesnt already exist here.
//     console.log(req.file.size);
//     try {
//       const newUser = await res.user.save();
//       res.status(201).json(newUser);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   }
// );

// POST a single new instance of a certain model
router.post("/", upload.single("vehicleImage"), async (req, res) => {
  const post = await new Post({
    title: req.body.title
  })

  try {
    const new_post = await post.save();

    if (new_post) {
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

router.get("/postImages/allImages", async (req, res) => {
  await gfs.find().toArray((err, files) => {
    if (err) {
      console.log(err)
    }
    // check if files exist
    if (!files || files.length === 0) {
      console.log("no files found")
      return res.status(404).json({ err: "no files found" });
    }
    // files were found
    return res.status(201).json(files);
  });
});

router.get("/postImagesByFilename/:filename", (req, res) => {
  gfs.find({ filename: req.params.filename }).toArray((err, files) => {
    if (err) {
      console.log(err)
    }
    // check if files exist
    if (!files || files.length === 0) {
      return res.status(404).json({ err: "no files found" });
    }
    // files were found
    let gotData = false;
    files.map(async (file) => {
      let downloadStream = await gfs
        .openDownloadStreamByName(file.filename)
        .pipe(res);
      downloadStream.on("end", () => {
        test.ok(gotData);
        console.log("stream ended.");
      });
    });
  });
});

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
