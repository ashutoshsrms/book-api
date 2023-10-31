const express = require('express');
const app = express();
const { BASE_API,PORT,MONGODB_URI} = require('./config/config');
const connectToDatabase = require('./db');
const cors =require('cors');

connectToDatabase(MONGODB_URI);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "Book App" });
  });


// importing routes
const bookRoutes = require('./routes/book.routes');

//using the routes

app.use(`${BASE_API}`, bookRoutes);

app.listen(PORT, () => console.log(`listening on port ${PORT}!`))