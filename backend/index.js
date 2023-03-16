const express = require('express');
const cors = require("cors")
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const getBrands = require("./routes/getBrands")
const getProfiles = require("./routes/getProfiles")
const app = express();

const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/getBrands", getBrands)
app.use("/getProfiles", getProfiles)

//start server
app.listen(PORT, () => {
    console.log("Server started!");
})

try {
    mongoose.connect("mongodb://localhost:27017/TaskSocial");
    console.log("MongoDB is connected");
}
catch(err) {
    console.error(err);
}
