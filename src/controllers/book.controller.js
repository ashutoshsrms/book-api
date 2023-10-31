const Book = require('../models/book.model');

const addBook = async (req, res) => {
    try {
        const { title, author, summary } = req.body;
        if (!title || !author || !summary) {
            return res.status(401).json({ error: 'All fields are required' });
        }

        const newBook = new Book({ title, author, summary });
        await newBook.save();
        res.status(200).json({ message: "New Book Added Sucessfully", data: newBook });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({ data: books });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.status(200).json(book);
    } catch (error) {
        console.error(error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ error: 'Invalid book ID format' });
        }
        res.status(500).json({ error: error.message });
    }
};



const updateBook = async (req, res) => {
    try {
        const { title, author, summary } = req.body;
        const existingBook = await Book.findById(req.params.id);
        if (!existingBook) {
            return res.status(404).json({ error: 'Book not found' });
        }
        if (!title || !author || !summary) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        existingBook.title = title;
        existingBook.author = author;
        existingBook.summary = summary;
        await existingBook.save();

        res.status(200).json({ message: "Updated", data: existingBook });
    } catch (error) {
        console.error(error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ error: 'Invalid book ID format' });
        }
        res.status(500).json({ error: error.message });
    }
};


const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error(error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ error: 'Invalid book ID format' });
        }
        res.status(500).json({ error: error.message });
    }
};



module.exports = {
    addBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
}