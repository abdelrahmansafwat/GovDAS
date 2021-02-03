const express = require('express');
const router = express.Router();
const decisionModel = require("../models/decision");
const path = require("path");

//All decisions route
router.get('/all', async (req, res) => {
    decisionModel.find({}, (err, data) => {
        if (err) {
            res.status(500).json({
              message: err.message,
            });
            return;
        }
        res.status(200).json({
            message: "Retrieved all decisions",
            decisions: data,
        });
    })
});

//Specific decision route
router.post('/specific', async (req, res) => {
    decisionModel.find({_id: req.body._id}, (err, data) => {
        if (err) {
            res.status(500).json({
              message: err.message,
            });
            return;
        }
        res.status(200).json({
            message: "Retrieved specific decision",
            data
        });
    })
});

//Decision image route
router.get('/image/:file', async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "files", req.params.file));
});

module.exports = router;