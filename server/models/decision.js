require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });

let decisionSchema = new Schema({
    title: { type: String, required: true },
    issuedby: { type: String, required: true },
    summary: { type: String, required: true },
    image: { type: String, required: true },
    date: { type: Date, default: Date.now },
    tags: { type: [String], required: true },
});

let decisionModel = mongoose.model("decisionModel", decisionSchema);

module.exports = decisionModel;