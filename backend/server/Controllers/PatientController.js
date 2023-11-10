const patientModel = require('../Models/patients');
const Appointment = require('../Models/appointements');
const Doctor = require('../Models/doccs');
const bcrypt = require('bcrypt');

exports.createPatient = async (req, res) => {
  const {
    fullName,
    email,
    dateOfBirth,
    gender,
    mobileNumber,
    emergencyContactFullName,
    emergencyContactMobileNumber,
    emergencyContactRelationToPatient,
    password, 
    username,
  } = req.body;
  try {
 
      const salt = await bcrypt.genSalt(); 
      const hashedPassword = await bcrypt.hash(password, salt);
      const newPatient= await patientModel.create({
        username,
        fullName,
        email,
        dateOfBirth,
        gender,
        mobileNumber ,
        emergencyContactFullName ,
        emergencyContactMobileNumber,
        emergencyContactRelationToPatient,
        password: hashedPassword,
      });
      res.status(200).json(newPatient)
  } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message })
  }
}


exports.getPatient = async (req, res) => {
  try {
    const patient = await patientModel.find();
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updatePatient = async (req, res) => {
  const { username } = req.params;
  try {
    const updated = await patientModel.findOneAndUpdate(
      { username: username },
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
};




exports.deletePatient= async (req, res) => {
  try {
    await patientModel.findByIdAndDelete(req.params.userid);
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
};



exports.getPatientByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const patient = await patientModel.findOne({ username: username });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getPatientsByDoctorId = async (req, res) => {
  const { docId } = req.params; 
  try {
    const doctor = await Doctor.findById(docId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    const appointments = await Appointment.find({ doctor: doctor._id });
    const patientIds = appointments.map((appointment) => appointment.patient);
    const patients = await patientModel.find({ _id: { $in: patientIds } });
    return res.json(patients);
  } catch (error) {
    console.error('Error fetching patients by doctor:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
