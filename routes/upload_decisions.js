const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const decisionModel = require("../models/decision");
const path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "files"));
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  },
});

var uploadDisk = multer({ storage: storage });

//New decision route
router.post("/new", uploadDisk.single("file"), async (req, res) => {
  console.log("file uploaded");
  console.log(req.file);

  //console.log(req);

  let newDecision = new decisionModel({
    title: req.body.title,
    issuedby: req.body.issuedby,
    summary: req.body.summary,
    image: req.file.originalname,
    tags: req.body.tags,
  });

  newDecision.save((err, data) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      res.status(200).json({
        message: "Decision saved",
      });
    }
  });
});

//Update decision route
router.post("/update", uploadDisk.single("file"), async (req, res) => {
  console.log("file uploaded");
  fs.unlink(path.join(__dirname, "files", req.body.oldimage), (err) => {
    res.status(500).json({
      message: err.message,
    });
  });

  let newDecision = await decisionModel.findOneAndUpdate(
    { _id: req.body._id },
    {
      title: req.body.title,
      issuedby: req.body.issuedby,
      summary: req.body.summary,
      image: req.body.image,
      tags: req.body.tags,
    },
    { new: true }
  );

  newDecision.save((err, data) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    }
    res.status(200).json({
      message: "Decision saved",
    });
  });
});

//Delete decision route
router.post("/delete", async (req, res) => {
  fs.unlink(path.join(__dirname, "..", "files", req.body.oldimage), (err) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  });

  decisionModel.deleteOne({ _id: req.body._id }, function (err) {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  });
});

module.exports = router;
