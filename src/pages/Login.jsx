import { FaUser, FaLock, FaChevronRight, FaGoogle } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate(); // Hook pour rediriger l'utilisateur

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("User Info:", decoded);

    // Stocker l'utilisateur dans le localStorage ou un contexte global
    localStorage.setItem("user", JSON.stringify(decoded));

    // Rediriger vers le tableau de bord
    navigate("/calendar");
  };

  const handleGoogleFailure = () => {
    console.log("Google login failed");
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="screen-content">
          <form className="login">
            <div className="login-field">
              <FaUser className="login-icon" />
              <input
                type="text"
                className="login-input"
                placeholder="User name / Email"
              />
            </div>
            <div className="login-field">
              <FaLock className="login-icon" />
              <input
                type="password"
                className="login-input"
                placeholder="Password"
              />
            </div>
            <button className="button login-submit">
              <span className="button-text">Log In Now</span>
              <FaChevronRight className="button-icon" />
            </button>
            <button className="button login-submit register-submit">
              <span className="button-text">Register</span>
              <FaChevronRight className="button-icon" />
            </button>
          </form>
          <div className="social-login">
            <h3>log in via</h3>
            <div className="social-icons">
              {/* Original Google Icon */}
              {/* <FaGoogle className="social-login-icon" /> */}

              {/* Google Login Button (Hidden Default UI) */}
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
        <div className="screen-background">
          <span className="screen-background-shape screen-background-shape4"></span>
          <span className="screen-background-shape screen-background-shape3"></span>
          <span className="screen-background-shape screen-background-shape2"></span>
          <span className="screen-background-shape screen-background-shape1"></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
