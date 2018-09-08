const mongoose = require('mongoose');

// @ts-ignore
const employeeSchema = mongoose.Schema({
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  email: { type: String, default: '' },
  mobile: { type: String, default: '' },
  office: { type: String, default: '' },
  address: { type: String, default: '' },
  createdAT: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Employee', employeeSchema);
