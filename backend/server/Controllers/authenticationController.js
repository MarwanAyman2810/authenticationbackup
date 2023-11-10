//require('dotenv').config({ path: '../backend/server/.env' }); // This line should be at the very top of your main file
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const Doctor = require('../Models/doccs');
const Patient = require('../Models/patients');
const Admin = require('../Models/Admin');
const Pharmacist = require('../Models/pharmacists');
const patients = require('../Models/patients');

// Set up NodeMailer transporter
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'marwantest70@gmail.com',
    pass: 'pgdo wmjl wxpt ukug'
  }
});
const otpStorage = new Map();

// var mailOptions = {
//   from: 'marwantest70@gmail.com',
//   to: 'marwantest70@gmail.com',
//   subject: 'Reset Password Link',
//   text: `haaaaa${otp}`
// };




const sendOtp = async (req, res) => {
  try {
    const { username } = req.body;
    // Define a mapping from role to model
    const Models = [
      { model: Doctor, role: 'Doctor' },
      { model: patients, role: 'Patient' },
      { model: Admin, role: 'Admin' },
      { model: Pharmacist, role: 'Pharmacist' }
    ];

    // Find the model based on the role
    // const Model = roleToModelMapping[role];
    // if (!Model) {
    //   return res.status(400).json({ message: 'Invalid user role' });
    // }

    // Find the user in the respective model
    
    for (const Model of Models){
    const user = await Model.model.findOne({ username: username });
    
    if (user) {
      const otp = `${Math.floor(100000 + Math.random() * 900000)}`;
      // TODO: Store the OTP securely and associate it with the user for later verification
      otpStorage.set(user.username,otp);
      console.log(otpStorage);
      var mailOptions = {
        from: 'marwantest70@gmail.com',
        to: user.email,
        subject: 'Reset Password Link',
        text: `Your OTP for resetting your password is: ${otp}` // Include the OTP in the email text
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          return res.send({Status: "Success"})
        }
      });

      return res.status(200).json({ message: 'OTP sent to mail successfully' });
    }
  }  
      return res.status(404).json({ message: 'User not kabab' });
    
  } catch (error) {
    console.error(error); // Log the actual error for debugging
    res.status(500).json({ message: 'An error occurred during the OTP sending process' });
  }
};
module.exports = sendOtp;


// Example controller for verifying OTP
const verifyOtp = async (req, res) => {
  try {
    const { username,otp } = req.body;

    // Assuming you have a method to get the stored OTP for a user
    const storedOtp = otpStorage.get(username);

    if (!storedOtp) {
      return res.status(404).json({ message: 'OTP expired' });
    }

    if (otp === storedOtp) {
      // Optionally, remove the OTP from storage after successful verification
     
      otpStorage.delete(username);
      // Handle successful verification
      return res.status(200).json({ message: 'OTP verified successfully' });
      
    } else {
      return res.status(400).json({ message: 'Wrong OTP' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).json({ message: 'An error occurred while verifying OTP' });
  }
};





// for (const userType of userTypes) {
//   const user = await userType.model.findOne({ username: username });
//   if (user) {
//     //console.log('User found:', user); // Log the user object
//     const otp = `${Math.floor(100000 + Math.random() * 900000)}`;

//   // Send the email with the OTP
//   await transporter.sendMail({
//     from: process.env.EMAIL_USERNAME,
//     to: user.email,
//     subject: 'Password Reset OTP',
//     text: `Your OTP for resetting your password is: ${otp}`,
//     // You can also use HTML body content
//   });
// } 
// }











const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userTypes = [
      { model: Doctor, role: 'Doctor' },
      { model: Patient, role: 'Patient' },
      { model: Admin, role: 'Admin' },
      { model: Pharmacist, role: 'Pharmacist' }
    ];
    for (const userType of userTypes) {
      const user = await userType.model.findOne({ username: username });
      if (user) {
        console.log('User found:', user); // Log the user object
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log('Password Match:', passwordMatch); // Log the result of password comparison
        if (passwordMatch) {
          return res.json({
            success: true,
            message: 'Logged in successfully',
            role: userType.role
          });
        } else {
          // await sendOtp(user);
          return res.status(406).json({ success: false, message: 'Wrong password' });
        }
      }
    }
    return res.status(404).json({ success: false, message: 'User not shishtawok' });
  } catch (error) {
    console.error(error); // Log the actual error for debugging
    res.status(500).json({ success: false, message: 'An error occurred during login' });
  }
};







const verifyemail = async (req, res) => {
  try {
    const {email} = req.body;
    const userTypes = [
      { model: Doctor, role: 'Doctor' },
      { model: Patient, role: 'Patient' },
      { model: Admin, role: 'Admin' },
      { model: Pharmacist, role: 'Pharmacist' }
    ];
    for (const userType of userTypes) {
      const user = await userType.model.findOne({ email: email });
      if (user) {
        console.log('User found:', user); // Log the user object
        // const passwordMatch = await bcrypt.compare(password, user.password);
        // console.log('Password Match:', passwordMatch); // Log the result of password comparison
        // if (passwordMatch) {
        //   return res.json({
        //     success: true,
        //     message: 'Logged in successfully',
        //     role: userType.role
        //   });
        // } else {
        //   // await sendOtp(user);
        //   return res.status(406).json({ success: false, message: 'Wrong password' });
        // }
      }
    }
    return res.status(404).json({ success: false, message: 'User not found' });
  } catch (error) {
    console.error(error); // Log the actual error for debugging
    res.status(500).json({ success: false, message: 'An error occurred during login' });
  }
};



module.exports = {
  sendOtp,verifyOtp,login
};
