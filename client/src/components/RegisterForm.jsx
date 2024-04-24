import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SuccessModal from "./SuccessModal";
import "./RegisterForm.css";




const Register = ({ onSuccess }) => {
  const [file, setFile] = useState(null);
  const [hospitalName, setHospitalName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const [ambulancesAvailable, setAmbulancesAvailable] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [emergencyWardNumber, setEmergencyWardNumber] = useState("");
  const [password, setPassword] = useState("");


  //   const [hospitalData, setHospitalData] = useState({
  //     hospitalName: '',
  //     address: '',
  //     city: '',
  //     state: '',
  //     pincode: '',
  //     registrationDate: '',
  //     ambulancesAvailable: '',
  //     email: '',
  //     phone: '',
  //     registrationNumber: '',
  //     emergencyWardNumber: '',
  //     // registrationCertificate: '',
  //     password: '',
  //     // confirmPassword: ''
  //   });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("hospitalName", hospitalName);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("pincode", pincode);
    formData.append("registrationDate", registrationDate);
    formData.append("ambulancesAvailable", ambulancesAvailable);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("registrationNumber", registrationNumber);
    formData.append("emergencyWardNumber", emergencyWardNumber);
    formData.append("registrationCertificate", file);
    formData.append("password", password);

    try {
      await axios.post(
        "http://localhost:5000/api/hospitals/register",
        formData
      );
      
      onSuccess();
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setHospitalData(prevData => ({
  //       ...prevData,
  //       [name]: value
  //     }));
  //   };
 
  return (
      
      <div className="form-container">
        <form
          onSubmit={handleSubmit}
          className="form-container2"
          encType="multipart/form-data"
        >
          <input
            type="text"
            name="hospitalName"
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
            placeholder="Hospital Name"
            required
          />
          <input
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            required
          />
          <input
            type="text"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            required
          />
          <input
            type="text"
            name="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="State"
            required
          />
          <input
            type="text"
            name="pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Pincode"
            required
          />
          <input
            type="date"
            name="registrationDate"
            value={registrationDate}
            onChange={(e) => setRegistrationDate(e.target.value)}
            placeholder="Registration Date"
            required
          />
          <input
            type="number"
            name="ambulancesAvailable"
            value={ambulancesAvailable}
            onChange={(e) => setAmbulancesAvailable(e.target.value)}
            placeholder="Ambulances Available"
            required
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            required
          />
          <input
            type="text"
            name="registrationNumber"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            placeholder="Registration Number"
            required
          />
          <input
            type="text"
            name="emergencyWardNumber"
            value={emergencyWardNumber}
            onChange={(e) => setEmergencyWardNumber(e.target.value)}
            placeholder="Emergency Ward Number"
            required
          />
          <input
            type="file"
            name="registrationCertificate"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create Password"
            required
          />

          <button type="submit" className="form-submit-btn">
            Register
          </button>
        </form>
      </div>
      
    
  );
};

export default Register;
