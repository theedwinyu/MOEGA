const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    firstName: { 
        type: String, 
        required: true,
      },
    phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

}, {
  timestamps: true,
});

const User = mongoose.model('Teacher', teacherSchema);

module.exports = User;