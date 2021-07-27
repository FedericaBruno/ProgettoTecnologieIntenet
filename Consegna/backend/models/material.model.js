const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*The schema of the material object.*/
const materialSchema = new Schema({
    name: String,
    price: Number,
    description: String,
    quantity: Number,
    category: String,
    img_url: String
});

module.exports = mongoose.model('Material', materialSchema);