const User = require('../models/UserEntity');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length > 0) {
                return res.status(409).json({
                    message: "email already exists!"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(), //automatic & unique ID
                            email: req.body.email,
                            password: hash
                        });
                        user.save().then(result => {
                            console.log(result);
                            res.status(201).json({
                                message: "user created successfully!"
                            });
                        }).catch(err => {
                            res.status(500).json({
                                error: err
                            });
                        });
                    }
                })
            }
        });
}


exports.login = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                res.status(401).json({
                    message: 'Login failed 1 :('
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Login failed 2 :('
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: 'Login success !!!',
                        token: token
                    });
                }
                res.status(401).json({
                    message: 'Login failed 3 :('
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.deleteUser = (req, res, next) => {
    User.remove({ _id: req.params.id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "user deleted!"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.getAllUsers = (req, res, next) => {
    User.find()
        .exec()
        .then(result => {
            res.status(200).json({
                users: result.map(user => {
                    return {
                        _id: user._id,
                        email: user.email,
                        password: user.password
                    }
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}