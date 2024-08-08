const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const { ObjectId } = mongoose.Schema.Types;


const ProductSchema = new Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    gia: { type: Number, required: true },
    title: { type: String },
    categoryId: {
        type: ObjectId,
        ref: "Categories",
      },
});

const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel;