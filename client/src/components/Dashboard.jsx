import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar.jsx";
import "./Dashboard.css"; // Import the CSS file
import WebFont from "webfontloader";
import AnimatedPage from "./AnimatedPage.jsx";

const Dashboard = () => {
  const [hospitalData, setHospitalData] = useState([]);
  const [sortedField, setSortedField] = useState(null);
  const [sortedOrder, setSortedOrder] = useState("asc"); // Default to ascending order
  const [searchQuery, setSearchQuery] = useState("");

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    WebFont.load({
      google: {
        families: [
          "Poppins",
          "Montserrat",
          "Madimi One",
          "Kode Mono",
          "Baloo 2",
        ],
      },
    });
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/hospitals/data"
        );
        setHospitalData(response.data);
        const data = response.data;

        setFilteredData(response.data); // Initialize filtered data with all hospitals
      } catch (error) {
        console.error("Error fetching hospital data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once after component mounts

  useEffect(() => {
    // Filter data based on the search query
    const filtered = hospitalData.filter((hospital) =>
      hospital.hospitalName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchQuery, hospitalData]);
  // Function to handle viewing certificate
  // Function to handle viewing certificate
  const handleViewCertificate = (certificate) => {
    // Construct the URL for the certificate based on its filename and the server URL
    const certificateUrl = `http://localhost:5000/uploads/${certificate}`;

    // Open the certificate URL in a new tab
    window.open(certificateUrl, "_blank");
  };
  // Function to sort data based on field and order
  const handleSort = (field) => {
    const order =
      sortedField === field && sortedOrder === "asc" ? "desc" : "asc"; // Toggle order
    const sorted = [...filteredData].sort((a, b) => {
      const comparison = a[field].localeCompare(b[field], undefined, {
        sensitivity: "base",
      }); // Case-insensitive sorting
      return order === "asc" ? comparison : -comparison;
    });
    setFilteredData(sorted);
    setSortedField(field);
    setSortedOrder(order);
  };

  // Function to reset sorting
  const resetSort = () => {
    setFilteredData(hospitalData);
    setSortedField(null);
    setSortedOrder("asc");
  };

  const toggleHospitalStatus = async (hospitalId, currentStatus) => {
    try {
      // Determine the new status based on the current status
      const newStatus = currentStatus === "active" ? "not active" : "active";
      // Send a request to the backend to update the status of the hospital
      await axios.put(
        `http://localhost:5000/api/hospitals/${hospitalId}/status`,
        { status: newStatus }
      );
      // Update the status locally in the hospitalData state
      setHospitalData((prevHospitalData) =>
        prevHospitalData.map((hospital) =>
          hospital._id === hospitalId
            ? { ...hospital, status: newStatus }
            : hospital
        )
      );
    } catch (error) {
      console.error("Error toggling hospital status:", error);
    }
  };

  return (
    <AnimatedPage>
      <div className="hero">
        <div className="header1">
          <Navbar />
        </div>
        <h1 className="title">Hospital Registrations</h1>
        {/* Sorting and filtering buttons */}
        <div className="search-filter-container">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="sorting-buttons">
            <button onClick={() => handleSort("hospitalName")}>
              Sort by Name{" "}
              {sortedField === "hospitalName" &&
                (sortedOrder === "asc" ? "🔼" : "🔽")}
            </button>
            <button onClick={resetSort}>Reset Sorting</button>
          </div>
        </div>
        <div className="table-container">
          <table className="hospital-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>
                  Hospital Name{" "}
                  {sortedField === "hospitalName" &&
                    (sortedOrder === "asc" ? "🔼" : "🔽")}
                </th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone No.</th>
                <th>City</th>
                <th>State</th>
                <th>Pincode</th>
                <th>Hospital Registration Date</th> {/* New column header */}
                <th>Hospital Registration Number</th>
                <th>Emergency-Ward Number</th>
                <th>Number of Ambulances</th>
                <th>Hospital Registration Photo</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((hospital, index) => (
                <tr key={hospital._id}>
                  <td>{index + 1}</td> {/* Serial Number */}
                  <td>{hospital.hospitalName}</td>
                  <td>{hospital.email}</td> {/* Email */}
                  <td>{hospital.address}</td>
                  <td>{hospital.phone}</td> {/* Phone Number */}
                  <td>{hospital.city}</td>
                  <td>{hospital.state}</td>
                  <td>{hospital.pincode}</td>
                  <td>
                    {new Date(hospital.registrationDate).toLocaleDateString()}
                  </td>{" "}
                  {/* Display registration date */}
                  <td>{hospital.registrationNumber}</td>{" "}
                  {/* Registration Number */}
                  <td>{hospital.emergencyWardNumber}</td>{" "}
                  {/* Emergency Ward Number */}
                  <td>{hospital.ambulancesAvailable}</td>{" "}
                  {/* Number of Ambulances */}
                  <td>
                    {/* Button to view certificate */}
                    <button
                      onClick={() =>
                        handleViewCertificate(hospital.registrationCertificate)
                      }
                    >
                      View Certificate
                    </button>
                  </td>
                  <td>
                    <button
                      className={
                        hospital.status === "active"
                          ? "active-button"
                          : "not-active-button"
                      }
                      onClick={() =>
                        toggleHospitalStatus(hospital._id, hospital.status)
                      }
                    >
                      {hospital.status === "active" ? "Active" : "Not Active"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Dashboard;