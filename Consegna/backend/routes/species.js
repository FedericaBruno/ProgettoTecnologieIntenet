const router = require('express').Router();
let Specie = require('../models/specie.model');

/*Handle incoming HTTP GET request, to get specie by its Id.*/
router.route('/').get((req, res) => {
    Specie.find()
        .then(species => res.json(species))
        .catch(err => res.status(400).json('Error: ' + err));
});

/*Handle incoming HTTP POST request, create a new istance of Specie in the database.*/
router.route('/add').post((req, res) => {
    const specie_name = req.body.specie_name;
    const img_url = req.body.img_url;

    const newSpecie = new Specie({
        specie_name,
        img_url,
    });

    newSpecie.save()
        .then(() => res.json('Specie added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;