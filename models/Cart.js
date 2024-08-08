const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const { ObjectId } = mongoose.Schema.Types;


const CartSchema = new Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    gia: { type: Number, required: true },
    quantity:{ type: Number, required: true }
});

const CartModel = mongoose.model('Cart', CartSchema);

module.exports = CartModel;