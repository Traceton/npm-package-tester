const express = require("express");
const mongoose = require("mongoose");
const router = express();
const Vehicle = require("../models/vehicle");
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

// create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = req.body.itemId;
        const fileInfo = {
          filename: filename,
          bucketName: "inventoryItemPhotos",
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

// middleware for finding vehicle by id
let findById = async (req, res, next) => {
  let vehicle;
  try {
    vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      res.status(404).json({
        message_type: "warning",
        message: "could not find a vehicle",
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
  res.vehicle = vehicle;
  next();
};

// GET all of the instances of a certain model
router.get("/", async (req, res) => {

  const vehicles = await Vehicle.find()
  try {
    if (vehicles) {
      res.status(201).json({
        message_type: "success",
        message: "good response",
        vehicles: vehicles
      });
    } else {
      res.status(404).json({
        message_type: "warning",
        message: "could not find a vehicle",
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
      vehicle: res.vehicle
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
router.post("/", upload.single("vehicleImage"), async (req, res) => {
  const vehicle = await new Vehicle({
    year: req.body.year,
    make: req.body.make,
    model: req.body.model,
    price: req.body.price,
    sellerid: req.body.sellerid
  })

  try {
    const new_vehicle = await vehicle.save();
    if (new_vehicle) {
      res.status(201).json({
        message_type: "success",
        message: "good response",
        vehicle: new_vehicle
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

    if (req.body.year != null) {
      res.vehicle.year = req.body.year;
    } if (req.body.make != null) {
      res.vehicle.make = req.body.make;
    } if (req.body.model != null) {
      res.vehicle.model = req.body.model;
    } if (req.body.price != null) {
      res.vehicle.price = req.body.price;
    } if (req.body.sellerid != null) {
      res.vehicle.sellerid = req.body.sellerid;
    }

    try {
      const updated_vehicle = await res.vehicle.save();

      if (updated_vehicle) {
        res.status(201).json({
          message_type: "success",
          message: "good response",
          vehicle: updated_vehicle
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
    let deleted = await Vehicle.findOneAndDelete(req.params.id);
    if (deleted) {
      res.status(201).json({
        message_type: "success",
        message: "vehicle deleted",
      });
    } else {
      res.status(404).json({
        message_type: "error",
        message: "could not find vehicle",
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
