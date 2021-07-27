const router = require('express').Router();
let Material = require('../models/material.model');

/*Handle incoming HTTP GET request, to get all materials from the database.*/
router.route('/').get((req, res) => {
    Material.find()
        .then(materials => res.json(materials))
        .catch(err => res.status(400).json('Error: ' + err));
});

/*Handle incoming HTTP GET request, to get a material by its Id.*/
router.get('/:materialId', async (req, res) => {
    try{
        const material = await Material.findById(req.params.materialId);
        res.json(material);
    } catch(err){
        res.json({message: err});
    }
});

/*Handle incoming HTTP POST request, create a new istance of Material in the database.*/
router.route('/add').post((req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const quantity = req.body.quantity;
    const category = req.body.category;
    const img_url = req.body.img_url;


    const newMaterial = new Material({
        name,
        price,
        description,
        quantity,
        category,
        img_url,
    });

    newMaterial.save()
        .then(() => res.json('Material added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;