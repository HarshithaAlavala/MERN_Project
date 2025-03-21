const express = require('express');
const { addTransaction, getAllTransaction } = require('../controllers/transactionCtrl');

//router object
const router = express.Router();

router.post('/add-transaction', addTransaction);

router.post('/get-transaction', getAllTransaction);

module.exports = router;