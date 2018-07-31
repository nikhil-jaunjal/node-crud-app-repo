const mongoose = require('mongoose');
const Order = require('../models/OrderEntity');
const Product = require('../models/ProductEntity');

exports.getAllOrders = (req, res, next) => {
    Order.find()
        .select('_id product quantity')
        .populate('product', 'name')
        .exec()
        .then(docs => {
            res.status(200).json({
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity
                    }
                })
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.getOrderById = (req, res, next) => {
    Order.findById(req.params.id)
        .select('_id product quantity')
        .populate('product', 'name price')
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.createOrder = (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(500).json({
                    message: "product not found"
                });
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            });
            order.save()
        }).then(result => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}
exports.updateOrder = (req, res, next) => {
    res.json({
        message: 'PUT not implemented here..!'
    });
}

exports.deleteOrder = (req, res, next) => {
    Order.remove({ _id: req.params.id })
        .exec()
        .then(docs => {
            res.status(200).json({
                message: "Order deleted!"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}