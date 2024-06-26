const mongoose = require('mongoose');
const User = require('../Models/User'); // Import User model and schema

const patientSchema = new mongoose.Schema();
patientSchema.add(User.UserSchema); // Adding UserSchema to PatientSchema
patientSchema.add({
  role: { 
    type: String,
    default: 'patient',
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  emergencyContactFullName: {
    type: String,
    required: true,
  },
  emergencyContactMobileNumber: {
    type: String,
    required: true,
  },
  emergencyContactRelationToPatient: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('patients', patientSchema);



































// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const patientSchema = new Schema({
//   username: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   fullName: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type:String,
//     required: true,
//   },
//   dateOfBirth: {
//     type: String,
//     required: true,
//   },
//   gender: {
//     type: String,
//     required: true,
//   },
//   mobileNumber: {
//     type: String,
//     required: true,
//   },
//   emergencyContactFullName: {
//     type: String,
//     required: true,
//   },
//   emergencyContactMobileNumber: {
//     type: String,
//     required: true,
//   },
//   emergencyContactRelationToPatient: {
//     type: String,
//     required: true,
//   },
  
// });

// module.exports = mongoose.model('patients', patientSchema);
