const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*The schema of the order object.*/
const orderSchema = new Schema({
    name: String,
    surname: String,
    id_user: String,
    total: Number,
    date: {
        type: Date,
        default: Date
    },
    cart_items: Array,
    address: String,
    city: String,
    cap: String,
    cart_number: String,
    expiration_date: String,
    controll_code: String
});

module.exports = mongoose.model('Order', orderSchema);