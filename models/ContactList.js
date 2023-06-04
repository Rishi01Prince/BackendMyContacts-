const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactListSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  contacts: {
    type: Array,
  },
});

module.exports = mongoose.model('Contact', ContactListSchema);
