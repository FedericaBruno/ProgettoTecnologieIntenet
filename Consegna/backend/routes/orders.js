const router = require('express').Router();
let Order = require('../models/order.model');

/*Handle incoming HTTP GET request, to get all orders from the database.*/
router.route('/').get((req, res) => {
    Order.find()
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json('Error: ' + err));
});

/*Handle incoming HTTP GET request, to get an order by its Id.*/
router.get('/:orderId', async (req, res) => {
    try{
        const order = await Order.findById(req.params.orderId);
        res.json(order);
    } catch(err){
        res.json({message: err});
    }

});

/*Handle incoming HTTP POST request, create a new istance of Order in the database.*/
router.route('/add').post((req, res) => {
    const id_user = req.body.id_user;
    const name = req.body.name;
    const surname = req.body.surname;
    const address = req.body.address;
    const city = req.body.city;
    const cap = req.body.cap;
    const total = req.body.total;
    const cart_items = req.body.cart_items;
    const cart_number = req.body.cart_number;
    const expiration_date = req.body.expiration_date;
    const controll_code = req.body.controll_code;



    const newOrder = new Order({
        id_user,
        name,
        surname,
        address,
        city,
        cap,
        total,
        cart_items,
        cart_number,
        expiration_date,
        controll_code
    });

    newOrder.save()
        .then(() => res.json('Order added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;