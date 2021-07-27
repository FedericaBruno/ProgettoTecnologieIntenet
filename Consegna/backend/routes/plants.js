const router = require('express').Router();
let Plant = require('../models/plant.model');

/*Handle incoming HTTP GET request, to get all plants from the database.*/
router.route('/').get((req, res) => {
    Plant.find()
        .then(plants => res.json(plants))
        .catch(err => res.status(400).json('Error: ' + err));
});

/*Handle incoming HTTP POST request, create a new istance of Plant in the database.*/
router.route('/add').post((req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const size = req.body.size;
    const quantity = req.body.quantity;
    const category = req.body.category;
    const species = req.body.species;
    const img_url = req.body.img_url;


    const newPlant = new Plant({
        name,
        price,
        size,
        quantity,
        category,
        species,
        img_url,
    });

    newPlant.save()
        .then(() => res.json('Plant added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

/*Handle incoming HTTP GET request, to get the plant by its Id.*/
router.get('/:plantId', async (req, res) => {
    try{
        const plant = await Plant.findById(req.params.plantId);
        res.json(plant);
    } catch(err){
        res.json({message: err});
    }
});

module.exports = router;