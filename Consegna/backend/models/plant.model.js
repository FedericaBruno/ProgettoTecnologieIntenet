const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*The schema of the plant object.*/
const plantSchema = new Schema({
    name: String,
    price: Number,
    size: String,
    quantity: Number,
    category: String,
    species: String,
    img_url: String
});

module.exports = mongoose.model('Plant', plantSchema);