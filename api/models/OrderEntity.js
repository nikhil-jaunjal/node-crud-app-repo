const mongoose = require('mongoose');

const OrderEntity = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, //special datatype by mongoose
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 }
});


module.exports = mongoose.model('Order', OrderEntity);