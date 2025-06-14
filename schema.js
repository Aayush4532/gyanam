const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    language: {
        type: String,
        required: true,
        enum: [
            'English',
            'Assamese',
            'Bengali',
            'Bodo',
            'Dogri',
            'Gujarati',
            'Hindi',
            'Kannada',
            'Kashmiri',
            'Konkani',
            'Maithili',
            'Malayalam',
            'Manipuri',
            'Marathi',
            'Nepali',
            'Odia',
            'Punjabi',
            'Sanskrit',
            'Santali',
            'Sindhi',
            'Tamil',
            'Telugu',
        ],
        default: 'Hindi'
    }
});

mongoose.model("User", userSchema);
module.exports = userSchema;