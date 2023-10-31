const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');

// Define routes
router.post('/addBook',bookController.addBook);
router.get('/getAllBooks',bookController.getAllBooks);
router.get('/getBookById/:id',bookController.getBookById);
router.put('/updateBook/:id',bookController.updateBook);
router.delete('/deleteBook/:id',bookController.deleteBook);

module.exports = router;