const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({ path: './config/.env' });
const person = require("./models/User")
// Initialize Express app
const app = express();
app.use(express.json())

// Connect to MongoDB
const uri = process.env.MONGO_URI

mongoose.connect(uri, {} ).then (()=>{
console.log("connecting success")

// Define routes
app.get('/', (req, res) => {
    res.send('Welcoooom');
});

// GET: Return all users
app.get('/person', async (req, res) => {
    try {
        const users = await person.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({message : err.message});
    }
});

// POST: Add a new user to the database
app.post('/person', async (req, res) => {
    const user = new person({
        Name: req.body.Name,
        email: req.body.email,
        age: req.body.age
    });
    try {
        const newUser = await user.save();
        console.log("saving done")
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({message : err.message});
    }
});
// PUT: Edit a user by ID
app.put('/person/:id', async (req, res) => {
    try {
        const updatedUser = await person.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(updatedUser);
        conole.log("put done")
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

// DELETE: Remove a user by ID
app.delete('/person/:id', async (req, res) => {
    try {
        const deletedUser = await person.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted' });
        console.log("delete done")
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

}).catch(error => 
    console.log("connecting failure",error));
    
    app.listen(4500, () => {
        console.log(`Server is running on http://localhost:${4500}`)})

        