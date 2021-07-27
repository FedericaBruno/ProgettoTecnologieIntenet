const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
  })
);

/*Connection to MongoDB...*/
const uri = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection estabilished succesfully");
});

/*Require files.*/
const plantsRouter = require('./routes/plants');
const speciesRouter = require('./routes/species');
const usersRouter = require('./routes/users');
const materialsRouter = require('./routes/materials');
const ordersRouter = require('./routes/orders');

/*Use the files.*/
app.use('/plants', plantsRouter);
app.use('/species', speciesRouter);
app.use('/users', usersRouter);
app.use('/materials', materialsRouter);
app.use('/orders', ordersRouter);


/*Start to listening...*/
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});