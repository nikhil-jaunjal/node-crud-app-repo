const Product = require('../models/ProductEntity');
const mongoose = require('mongoose');


exports.getAllProducts = (req, res, next) => {
    Product.find()
        .select('_id name price productImage')
        .exec()
        .then(docs => {
            //console.log(docs);
            const response = {
                count: docs.length,
                products: docs.map(docs => {
                    return {
                        name: docs.name,
                        price: docs.price,
                        productImage: docs.productImage,
                        _id: docs._id,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/products/" + docs._id
                        }
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

exports.getProductById = (req, res, next) => {
    var id = req.params.id;
    Product.findById(id)
        .select('_id name price productImage')
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: "Invalid object passed in URL" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

exports.saveProduct = (req, res, next) => {
    console.log(req.file);
    const product = new Product({
        _id: new mongoose.Types.ObjectId(), //automatic & unique ID
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product.save().then(result => {
        console.log(result);
        res.status(200).json({
            message: 'POST method invoked',
            createdProduct: product
        });
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

exports.updateProduct = (req, res, next) => {
    const id = req.params.id;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

exports.deleteProduct = (req, res, next) => {
    const id = req.params.id;
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
}