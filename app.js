const express = require('express');
const app = new express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./Routes/noter');
const nameRoutes = require('./Routes/name');

mongoose.connect('mongodb+srv://LokeshBolisetty:lokeshbolisetty@buildapi.slgz6.mongodb.net/Database1?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Methods', 'PUT, PATCH, DELETE, GET, POST');
        return res.status(200).json({});
    }
    next();
});

app.use('/', router);
app.use('/names',nameRoutes)

module.exports = app;