const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express(); //we can use all express utilities through variable 'app'

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

//mongodb connection using mongoose
mongoose.connect('mongodb://localhost/node-rest-shop');
mongoose.Promise = global.Promise;

//important middelwares
app.use(morgan('dev'));
app.use('/uploads',express.static('uploads')); // makes folders available publically
app.use(bodyParser.urlencoded({ extended: false })); //cores
app.use(bodyParser.json());

//cors middelware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*'); //Origin,X-Requested-With,Content-Type,Accept,Authorization
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', '*');// all http methods GET,PUT,POST,DELET,ETC
        return res.status(200).json({});
    }
    next();
});

//custom middelwares
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user',userRoutes);

//middelware for error
app.use((req, res, next) => {
    const error = new Error('Page Not Found - custome error');
    error.status = 404;
    next(error);
});

//error handling
app.use((error, req, res, next) => {
    res.status(error.status || 400);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;