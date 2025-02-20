import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../components/ConfirmationModal";
import Accordion from "../components/Accordion";
import Statistics from "../components/Statistics";

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
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = await fetch(
        "https://tema-eduty-backend.torvalds.be/api/users/getOwnUserId",
        { credentials: "include" }
      );
      const data = await token.json();

      if (data) {
        try {
          setDecodedToken(data.id);
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!decodedToken) return;

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://tema-eduty-backend.torvalds.be/api/users/${decodedToken}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setFormData({
            lastName: data.lastName || "",
            firstName: data.firstName || "",
            serviceCenter: data.serviceCenter || "",
            email: data.email || "",
            phone: data.phone || "",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to fetch user data.",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while fetching user data.",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    };

    fetchUserData();
  }, [decodedToken]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://tema-eduty-backend.torvalds.be/api/users/${decodedToken}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Success",
          text: "Profile successfully updated!",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error",
          text: "Failed to update profile.",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error",
        text: "An error occurred while updating profile.",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "https://tema-eduty-backend.torvalds.be/api/users/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        Cookies.remove("token");
        navigate("/");
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Logout Failed",
          text: "An error occurred while logging out.",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error",
        text: "An error occurred during logout.",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleCreatePlanning = () => {    
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Success",
      text: "Planning successfully generated!",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  return (
    <div className="profile-container">
      <div className="title">
        <h2>Profile & Statistics</h2>
      </div>      
      <Accordion
        i={0}
        expanded={expanded}
        setExpanded={setExpanded}
        title="Show Statistics"
      >
        <Statistics />
      </Accordion>
     
      <Accordion
        i={1}
        expanded={expanded}
        setExpanded={setExpanded}
        title="Edit Profile"
      >
        <div className="subtitle">
          <p>
            <span>*</span> All fields are required.
          </p>
        </div>
        <div className="form">
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
            </div>
          </form>
        </div>
      </Accordion>
      <button
        type="button"
        className="logout"
        onClick={() => setIsModalOpen(true)}
      >
        Log out
      </button>
      <button
        type="button"
        className="createPlanningBtn"
        onClick={() => setIsGenerateModalOpen(true)}
      >
        Generate Planning
      </button>
      <Navbar />
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
        message="Are you sure you want to log out?"
      />
      <ConfirmationModal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        onConfirm={handleCreatePlanning}
        message="Confirm new planning generation?"
      />
    </div>
  );
};

export default Profile;
