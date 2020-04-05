const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const classSchema = new Schema({
  room_id: {
    type: String,
  },
  student: {
    type: String,
  },
  question: {
    type: String,
  },
  student_list: {
    type: [String],
  },
  question_list: {
    type: [String],
  },
}, {
  timestamps: true,
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;