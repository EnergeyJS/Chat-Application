// required express
const express = require('express');
const app = express();
const path = require("path");
app.use(express.json());
const logger = require('@skarif2/logger');
app.use(logger())

let cors = require('cors');
app.use(cors());
// add request
const request = require('request');
// require mongoose
const mongoose = require('mongoose');

// import database file
const config = require("./config/index");
const PORT = process.env.PORT || 5050;

// all router
const messageRouteData = require("./routes/messageRoute");
const friendRouteData = require("./routes/friendRoute");
const UserRouteData = require("./routes/userRoute");

// request moddleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// database connect 
(async () => {
    try {
        await mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("connected");
    } catch (error) {
        console.log(error)
    }
})()


app.listen(PORT, () => {
    console.log('server running', PORT);
})

app.use("/image", express.static(path.join(__dirname, 'public')));

//  all route
app.use('/api/message', messageRouteData);
app.use('/api/friend', friendRouteData);
app.use('/api/user', UserRouteData);