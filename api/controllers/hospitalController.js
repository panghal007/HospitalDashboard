const Hospital = require('../models/Hospital');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Controller for registering a new hospital
exports.registerHospital = async (req, res) => {
  
     console.log(req.file)
    const hospital = new Hospital({
      hospitalName: req.body.hospitalName,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pincode,
      registrationDate: req.body.registrationDate,
      ambulancesAvailable: req.body.ambulancesAvailable,
      email: req.body.email,
      phone: req.body.phone,
      registrationNumber: req.body.registrationNumber,
      emergencyWardNumber: req.body.emergencyWardNumber,
      registrationCertificate: req.file.originalname,
      password: req.body.password
    });

      hospital.save().then(()=>res.json("saved")).catch((err)=>res.status(400).json(`error:${err}`));

};
exports.loginHospital = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Hospital.findOne({ email });
        // console.log(user);
        if (user) {
          const isSame = await bcrypt.compare(password, user.password);
    
          if (isSame) {
            // Generate the JWT token using the createJWT method from the user instance
            const token = await user.createJWT();
            console.log(token);
            const userData = {
              username: user.username,
              email: user.email,
              // Add other user data fields as needed
            };
            // Send the token and user data back to the client
            return res.status(200).json({ user:userData, token });
          } else {
            return res.status(401).send("Authentication failed: Incorrect password");
          }
        } else {
          return res.status(401).send("Authentication failed: User not found");
        }
      } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
  };
