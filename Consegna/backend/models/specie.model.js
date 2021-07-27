const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*The schema of the specie object.*/
const specieSchema = new Schema({
    specie_name: String,
    img_url: String
});

module.exports = mongoose.model('Specie', specieSchema);