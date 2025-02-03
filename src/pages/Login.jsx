import { FaUser, FaLock, FaChevronRight, FaGoogle } from "react-icons/fa";

const Login = () => {
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
          </form>
          <div className="social-login">
            <h3>log in via</h3>
            <div className="social-icons">
              <FaGoogle className="social-login-icon" />
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
