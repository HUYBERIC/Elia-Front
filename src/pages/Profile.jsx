import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../components/ConfirmationModal";

const Profile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    serviceCenter: "",
    email: "",
    phone: "",
  });

  const [decodedToken, setDecodedToken] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Read the token from cookies
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
  }, []); // ✅ Execute only once

  useEffect(() => {
    if (!decodedToken) return;

    const fetchUserData = async () => {
      try {
        console.log("Fetching user data for ID:", decodedToken.id);
        const response = await fetch(
          `http://localhost:5000/api/users/${decodedToken.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("User Data:", data);

          setFormData((prevState) => ({
            ...prevState,
            lastName: data.lastName || "",
            firstName: data.firstName || "",
            serviceCenter: data.serviceCenter || "",
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
  }, [decodedToken]); // ✅ Execute when the decoded token is ready

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${decodedToken.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Profile successfully updated!");
      } else {
        alert("Error updating profile");
      }
    } catch (error) {
      console.error("Error during update", error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/logout", {
        method: "POST",
        credentials: "include", // Nécessaire pour inclure les cookies
      });

      if (response.ok) {
        Cookies.remove("token"); // Supprime le token du navigateur
        navigate("/"); // Redirige vers la page de connexion
      } else {
        console.error("Erreur lors de la déconnexion");
      }
    } catch (error) {
      console.error("Erreur lors de la requête de déconnexion", error);
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <p>
        {" "}
        <span>*</span> All fields are required.
      </p>
      <form onSubmit={handleSubmit}>
        <label className="input-label">
          <div>
            Last Name<span>*</span>:
          </div>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </label>

        <label className="input-label">
          <div>
            First Name<span>*</span>:
          </div>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>

        <label className="input-label">
          <div>
            Service Center<span>*</span>:
          </div>
          <select
            name="serviceCenter"
            value={formData.serviceCenter}
            onChange={handleChange}
            required
          >
            <option value="">Select a center</option>
            <optgroup label="North-West">
              <option value="Lendelede">Lendelede</option>
              <option value="Lochristi">Lochristi</option>
            </optgroup>
            <optgroup label="North-East">
              <option value="Merksem">Merksem</option>
              <option value="Stalen">Stalen</option>
              <option value="Schaarbeek-Noord">Schaarbeek Noord</option>
            </optgroup>
            <optgroup label="South-West">
              <option value="Gouy">Gouy</option>
              <option value="Schaerbeek-Sud">Schaerbeek Sud</option>
            </optgroup>
            <optgroup label="South-East">
              <option value="Bressoux">Bressoux</option>
              <option value="Villeroux">Villeroux</option>
              <option value="Gembloux">Gembloux</option>
            </optgroup>
          </select>
        </label>

        <label className="input-label">
          <div>
            Email<span>*</span>:
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label className="input-label">
          <div>
            Phone Number<span>*</span>:
          </div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>
        <div className="buttons">
          <button type="submit">Submit</button>
          <button
            type="button"
            className="logout"
            onClick={() => setIsModalOpen(true)}
          >
            Log out
          </button>
        </div>
      </form>
      <Navbar />
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
        message="Are you sure you want to log out?"
      />
    </div>
  );
};

export default Profile;
