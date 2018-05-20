const express = require("express"),
    app = express(),
    cors = require("cors"),
    http = require("http"),
    bodyParser = require("body-parser"),
    routes = require('./routes'),
    mongoose = require('mongoose'),
    config = require('./config');

mongoose.connect(`mongodb://${config.DBUSER}:${config.DBPASSWORD}${config.DBHOST}`, {});
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use('/',routes);
const port = 5000;
const server = http.createServer(app);
server.listen(port, () => console.log("server is listening on port:", server.address().port));