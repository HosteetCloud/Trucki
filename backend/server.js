const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose')

// Middleware
app.use(cors())
app.use(express.json());

// Routes
// app.use('/api/auth', require('./routes/auth'));

mongoose
    .connect("mongodb+srv://Hosteet:Trucki%402023@cluster0.5aikql0.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Failed to connect to MongoDB:', error));


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
