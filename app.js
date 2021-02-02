require("dotenv").config();
const express = require("express");
const cors = require('cors');
const app = express();
const user = require("./routes/user")
const retrieve_decisions = require("./routes/retrieve_decisions")
const upload_decisions = require("./routes/upload_decisions")
const path = require("path");

app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next();
  })
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "build")));
app.use(express.static("public"));

//Initializing routes
app.use('/api/user', user);     //Route for all user related functions (Login, register, etc.)
app.use('/api/retrieve_decisions', retrieve_decisions);  //Route for all decision retrieval related functions (Fetching, searching, etc.)
app.use('/api/upload_decisions', upload_decisions);  //Route for all payment related functions (Uploading, updating, etc.)

//For testing the root when deployed to cloud
app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

//Uncomment the line below this if testing on local machine
//app.listen(process.env.PORT | 3000, () => console.log("Listening on: " + (process.env.PORT | 3000)));

//Uncomment the line below and comment the line above if deploying to cloud
module.exports = app;