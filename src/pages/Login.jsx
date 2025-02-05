import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaLock, FaChevronRight, FaGoogle } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Gestion de la connexion
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password },
        { withCredentials: true } // Permet d'envoyer et recevoir les cookies HTTP-only
      );

      // Sauvegarde du token en localStorage si nécessaire
      localStorage.setItem("user", JSON.stringify(response.data));

      navigate("/calendar"); // Redirection après connexion
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  // Gestion de l'inscription
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        { email, password },
        { withCredentials: true }
      );

      alert("Inscription réussie ! Connecte-toi maintenant.");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  // Gestion du login avec Google
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);

      const response = await axios.post(
        "http://localhost:5000/api/auth/google-login",
        { email: decoded.email, firstName: decoded.given_name, lastName: decoded.family_name },
        { withCredentials: true }
      );

      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/calendar");
    } catch (error) {
      setError("Google login failed");
    }
  };

  const handleGoogleFailure = () => {
    setError("Google login failed");
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="screen-content">
          <form className="login" onSubmit={handleLogin}>
            <div className="login-field">
              <FaUser className="login-icon" />
              <input
                type="email"
                className="login-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="login-field">
              <FaLock className="login-icon" />
              <input
                type="password"
                className="login-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="button login-submit">
              <span className="button-text">Log In Now</span>
              <FaChevronRight className="button-icon" />
            </button>
          </form>

          <button onClick={handleRegister} className="button login-submit register-submit">
            <span className="button-text">Register</span>
            <FaChevronRight className="button-icon" />
          </button>

          <div className="social-login">
            <h3>log in via</h3>
            <div className="social-icons">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
                text="signin"
                size="large"
                shape="circle"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
