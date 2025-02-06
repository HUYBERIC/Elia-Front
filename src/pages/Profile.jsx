import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    serviceCenter: "",
    email: "",
    phone: "",
  });

  const [decodedToken, setDecodedToken] = useState(null); // ✅ État pour stocker le token décodé

  useEffect(() => {
    // Lire le token seulement une fois au premier rendu
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded);
        setDecodedToken(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      console.warn("No token found in cookies.");
    }
  }, []); // ✅ Exécuter une seule fois

  useEffect(() => {
    if (!decodedToken) return; // ✅ Ne pas fetch si le token n'est pas encore prêt

    const fetchUserData = async () => {
      try {
        console.log("Fetching user data for ID:", decodedToken.id);
        const response = await fetch(`http://localhost:5000/api/users/${decodedToken.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          console.log("User Data:", data);

          setFormData((prevState) => ({
            ...prevState,
            lastName: data.lastName || "",
            firstName: data.firstName || "",
            serviceCenter: data.serviceCenter?.serviceCenter || "",
            email: data.email || "",
            phone: data.phone || "",
          }));
        } else {
          console.error("Error fetching user data");
        }
      } catch (error) {
        console.error("Error during API request", error);
      }
    };

    fetchUserData();
  }, [decodedToken]); // ✅ Exécuter seulement lorsque le token est décodé

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/users/${decodedToken.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Profile successfully updated!");
      } else {
        alert("Error updating profile");
      }
    } catch (error) {
      console.error("Error during update", error);
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <p>Fields marked with <span>*</span> are required.</p>
      <form onSubmit={handleSubmit}>
        <label className="input-label">
          <div>Last Name<span>*</span>:</div>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </label>

        <label className="input-label">
          <div>First Name<span>*</span>:</div>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>

        <label className="input-label">
          <div>Service Center<span>*</span>:</div>
          <select
            name="serviceCenter"
            value={formData.serviceCenter}
            onChange={handleChange}
            required
          >
            <option value="">Select a center</option>
            <optgroup label="North-West">
              <option value="nw1">Lendelede</option>
              <option value="nw2">Lochristi</option>
            </optgroup>
            <optgroup label="North-East">
              <option value="ne1">Merksem</option>
              <option value="ne2">Stalen</option>
              <option value="ne3">Schaarbeek Noord</option>
            </optgroup>
            <optgroup label="South-West">
              <option value="s1">Gouy</option>
              <option value="s2">Schaerbeek Sud</option>
            </optgroup>
            <optgroup label="South-East">
              <option value="s3">Bressoux</option>
              <option value="s4">Villeroux</option>
              <option value="s5">Gembloux</option>
            </optgroup>
          </select>
        </label>

        <label className="input-label">
          <div>Email<span>*</span>:</div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label className="input-label">
          <div>Phone Number<span>*</span>:</div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Submit</button>
      </form>
      <Navbar />
    </div>
  );
};

export default Profile;
