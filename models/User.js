const mongoose = require('mongoose');

// Define User Schema
const personSchema = new mongoose.Schema ({
    Name : { type: String, required : true},
    email: { type: String, required: true},
    age: { type: Number,required: true }   
});


// Export User Model
module.exports = mongoose.model('User', personSchema);