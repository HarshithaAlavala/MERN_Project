const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const mongoose = require('mongoose');
const connectDb = require("./config/connectDb");

//config.env file
dotenv.config();


//database call
connectDb();
//rest object
const app = express();

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//routes


//user routes
app.use("/api/v1/users", require("./routes/userRoute"));
//transaction routes
app.use("/api/v1/transactions", require("./routes/transactionRoutes"));
//port
const PORT = process.env.PORT || 8080;

//listeners
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});