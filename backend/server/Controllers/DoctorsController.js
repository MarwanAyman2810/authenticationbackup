const doctors = require('../Models/doccs');
const bcrypt = require('bcrypt');

exports.createDoc = async (req, res) => {
  try {
    const {
      username,
      fullName,
      email,
      dateOfBirth,
      hourlyRate,
      affiliation,
      educationalBackground,
      speciality,
      password,
    } = req.body;
    console.log('Received data:', req.body); 

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newDoctor = new doctors({
      username,
      fullName,
      email,
      dateOfBirth,
      hourlyRate,
      affiliation,
      educationalBackground,
      speciality,
      password: hashedPassword, 
    });

    console.log('New Doctor:', newDoctor); 

    const savedDoctor = await newDoctor.save();
    console.log('Saved Doctor:', savedDoctor); 

    res.status(201).json(savedDoctor);
  } catch (err) {
    console.error(err); 
    res.status(500).json(err);
  }
};

exports.getAllDoctors = async (req, res) => {
  try {
    const doctor = await doctors.find();
    res.status(200).json(doctor);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateDoc = async (req, res) => {
  try {
      const updated = await doctors.findOneAndUpdate(
        req.params.username,
        req.body,
        { new: true }
      );
      res.status(200).json(updated);
    } catch (err) {
      res.status(500).json(err);
    }
  };



  exports.deleteDoc = async (req, res) => {
    try {
      await doctors.findByIdAndDelete(req.params.userid);
      res.status(204).end();
    } catch (err) {
      res.status(500).json(err);
    }
  };

  exports.getDoctorByUsername = async (req, res) => {
    const { username } = req.params;
    try {
      const doctor = await doctors.findOne({ username: username });
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      res.status(200).json(doctor);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  exports.updateDoctorByUsername = async (req, res) => {
    const { username } = req.params;
    try {
      const updated = await doctors.findOneAndUpdate(
        { username: username },
        req.body,
        { new: true }
      );
      if (!updated) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      res.status(200).json(updated);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  exports.deleteDoctorByUsername = async (req, res) => {
    const { username } = req.params;
    try {
      const deleted = await doctors.findOneAndDelete({ username: username });
      if (!deleted) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      res.status(204).end();
    } catch (err) {
      res.status(500).json(err);
    }
  };


exports.getDoctorByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const patient = await doctors.findOne({ username: username });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json(err);
  }
};