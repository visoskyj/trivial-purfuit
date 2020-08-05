const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const questionRoutes = require("./routes/questions");
const categoryToColorRoutes = require("./routes/categorymapping");

const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());


const uri = "mongodb://mongodbuser:UNIQUEID@trivialpursuit-shard-00-00.twmub.azure.mongodb.net:27017,trivialpursuit-shard-00-01.twmub.azure.mongodb.net:27017,trivialpursuit-shard-00-02.twmub.azure.mongodb.net:27017/TrivialPursuit?ssl=true&replicaSet=atlas-l8i7ui-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});


app.use('/question', questionRoutes);
app.use('/categoryToColor', categoryToColorRoutes);

app.listen(PORT, function() {
    console.log("Backend Server is running on Port: " + PORT);
});
