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
        "https://elia-back.vercel.app/api/users/login",
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
        "https://elia-back.vercel.app/api/users/register",
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

      // const response = await axios.post(
      //   "https://elia-back.onrender.com/api/auth/google-login",
      //   { email: decoded.email, firstName: decoded.given_name, lastName: decoded.family_name },
      //   { withCredentials: true }
      // );

      localStorage.setItem("user", JSON.stringify(decoded));
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

        <div className="social-login">
            <h3>log in via</h3>
            <div className="social-icons">
              <GoogleLogin
                clientId="522967352271-54aub3k94o9kg41e45icivraj3oiqv7n.apps.googleusercontent.com"
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
                text="signin"
                size="large"
                shape="circle"
              />
            </div>
          </div>

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

            <button
              onClick={handleRegister}
              className="button login-submit register-submit"
            >
              <span className="button-text">Register</span>
              <FaChevronRight className="button-icon" />
            </button>
          </form>

            <svg className="logo-elia" height="50" viewBox="0.132000000000001 -0.175 33.51 7.952" width="2500" xmlns="http://www.w3.org/2000/svg"><g fill="#f4711f"><path d="M15.254 3.223a.215.215 0 0 0-.187.157 2.89 2.89 0 0 1-.046.145c.065 0 .129.004.191.01a3.2 3.2 0 0 0 .044-.138l2.6-.251v-.174z"/><path d="M8.659 6.16c-1.017-.053-1.65-.539-1.847-1.194l1.466-.04c.162.162.476.253.784.274.447.031 1.093-.15 1.549-.381a2.76 2.76 0 0 1-1.083.161c-1.002-.068-1.394-.842-.823-1.639a3.072 3.072 0 0 1 1.935-1.198c-.832.08-1.832.662-2.31 1.328a1.69 1.69 0 0 0-.26.525l-.774.11c.07-.182.165-.369.292-.557 1.1-1.621 3.055-2.318 4.679-2.1.89.12 1.381.637 1.544 1.236l-1.444.078c-.144-.164-.43-.243-.719-.275-.431-.049-1.077.122-1.538.343a2.597 2.597 0 0 1 1.063-.125c.967.11 1.269.942.628 1.725-.47.572-1.287.97-2.062 1.053.818-.036 1.91-.52 2.447-1.174.167-.204.29-.455.346-.657l.774-.073a2.528 2.528 0 0 1-.167.34c-.79 1.358-2.346 2.354-4.48 2.24M6.694 4.795l-.326.01h-.012l-.359.032a.216.216 0 0 0-.198.223c.005.139.02.272.046.395.02.096.05.184.087.267a1.049 1.049 0 0 1-.324-.697.216.216 0 0 0-.222-.193l-1.666.046 1.744-.269a.216.216 0 0 0 .179-.169c.166-.785.768-1.592 1.64-2.279-.69.637-1.184 1.366-1.385 2.103a.217.217 0 0 0 .24.271l.742-.104a.217.217 0 0 0 .186-.202.97.97 0 0 1 .106-.298l-.059.142a.217.217 0 0 0 .233.291l.774-.111a.213.213 0 0 0 .127-.069 1.026 1.026 0 0 0 .406.751.593.593 0 0 1-.203-.119.217.217 0 0 0-.159-.063l-1.465.04a.236.236 0 0 0-.062.012.222.222 0 0 0-.07-.01m8.146-1.436a.216.216 0 0 0-.188-.079l-.812.077a.217.217 0 0 0-.19.165c-.058.244-.16.454-.353.727a3.695 3.695 0 0 1-.444.514c.183-.212.348-.443.492-.691.075-.13.14-.26.183-.371a.216.216 0 0 0-.222-.294l-.776.073a.216.216 0 0 0-.156.093 1.027 1.027 0 0 0-.43-.769c.131.037.229.087.28.145.044.05.108.077.174.073l1.445-.078a.195.195 0 0 0 .06-.013.187.187 0 0 0 .067.007l.78-.043a.217.217 0 0 0 .2-.257l-.034-.193a2.188 2.188 0 0 0-.267-.797c.202.19.35.413.432.664.028.085.042.194.054.3l.008.06a.216.216 0 0 0 .227.19l2.487-.135v-.208a.29.29 0 0 1 .005-.052l-2.524.136c-.016-.13-.03-.278-.07-.402-.244-.734-.94-1.223-1.887-1.433.594.285 1.026.722 1.216 1.295.056.17.069.297.121.573l-.78.043c-.2-.808-.849-1.374-1.89-1.514-1.688-.226-3.632.737-4.636 1.931-.283.336-.568.842-.582 1.077l-.743.105c.39-1.434 1.992-2.904 4.09-3.6 1.934-.641 3.753-.447 4.728.375C14.01.07 11.96-.175 9.752.558c-2.294.76-4.032 2.335-4.34 3.794l-2.42.371-2.86.411v.014l5.24-.143c.008.062.016.123.028.183.159.766 1.01 1.155 1.86 1.407-.517-.306-1.1-.632-1.222-1.227a2.102 2.102 0 0 1-.042-.36l.36-.03.325-.01c.128.794.943 1.459 2.134 1.544 1.75.125 3.77-.949 4.64-2.181.188-.268.316-.509.386-.802l.812-.077c-.01.036-.023.072-.035.107.085-.015.174-.025.266-.03a.214.214 0 0 0-.044-.172M21.256 2.47c0-.078.037-.147.093-.192l-2.367.128a.253.253 0 0 1 .027.112v.146l2.247-.121zM19.01 2.86v.174l2.246-.217v-.174zM22.24 2.23a.249.249 0 0 1 .187.24v.01l1.202-.065-1.202.115v.174l11.215-1.083v-.008z"/></g><path d="M22.428 2.48v.05l1.2-.115zM21.256 2.543l-2.247.121v.196l2.247-.216zM15.254 3.223l2.603-.251v-.246l-2.488.135a.215.215 0 0 1-.226-.189l-.008-.061c-.013-.106-.026-.215-.054-.3a1.593 1.593 0 0 0-.432-.663c.069.123.127.253.172.388.046.14.066.253.094.409l.035.192a.216.216 0 0 1-.2.257l-.78.043a.214.214 0 0 1-.067-.007.219.219 0 0 1-.06.014l-1.445.078a.215.215 0 0 1-.175-.074.597.597 0 0 0-.278-.144 1.024 1.024 0 0 1 .428.769.217.217 0 0 1 .157-.093l.775-.073a.217.217 0 0 1 .222.293 2.77 2.77 0 0 1-.182.371c-.145.248-.31.48-.492.691.172-.168.322-.34.444-.514.193-.272.295-.483.353-.726a.217.217 0 0 1 .19-.166l.812-.076a.215.215 0 0 1 .187.078c.04.048.055.11.045.171.044-.002.088-.004.133-.004h.004c.016-.048.032-.096.046-.145a.216.216 0 0 1 .187-.157M8.291 4.752a.219.219 0 0 1 .159.063.599.599 0 0 0 .203.12 1.027 1.027 0 0 1-.406-.751.216.216 0 0 1-.127.068l-.774.111a.216.216 0 0 1-.233-.291c.018-.048.038-.095.059-.142a.964.964 0 0 0-.106.298.216.216 0 0 1-.186.202l-.743.104a.217.217 0 0 1-.24-.27c.201-.738.695-1.467 1.386-2.104-.872.687-1.474 1.495-1.64 2.28a.217.217 0 0 1-.179.168l-1.744.269 1.666-.046c.113-.003.21.08.222.193a1.049 1.049 0 0 0 .325.698 1.265 1.265 0 0 1-.088-.268A2.315 2.315 0 0 1 5.8 5.06a.216.216 0 0 1 .198-.223l.36-.031h.012l.325-.011a.2.2 0 0 1 .07.01.197.197 0 0 1 .062-.012z" fill="#f14825"/><path d="M13.185 5.489a8.059 8.059 0 0 1-2.325 1.36c-1.91.732-3.79.644-4.876-.102 1.02.905 3.142 1.03 5.323.196a8.636 8.636 0 0 0 1.907-1.015 2.65 2.65 0 0 1-.03-.403v-.036" fill="#f4711f"/><path d="M22.16 3.703h-1.516c-.035 0-.062.024-.062.054v.59c0 .03.027.053.062.053h.828v2.762c0 .029.027.052.061.052h.627c.034 0 .06-.023.06-.052V3.757c0-.03-.026-.054-.06-.054M25.682 6.375c-.203.22-.514.267-.746.24a.464.464 0 0 1-.316-.164.505.505 0 0 1-.1-.315c0-.244.067-.418.198-.516a.623.623 0 0 1 .382-.103c.15 0 .382.032.582.094zm.778.865c0-.525.01-2.14.01-2.258 0-.333-.069-.649-.276-.873-.19-.206-.37-.298-.784-.355-.303-.041-.703.002-1.24.072-.032.004-.055.026-.055.052v.509c0 .016.009.03.024.04.016.011.037.015.056.011.496-.086.816-.108.995-.078.147.024.354.07.416.179.04.067.06.227.07.375a2.613 2.613 0 0 0-.628-.084c-.425 0-.766.137-1.015.408-.218.236-.328.53-.328.873 0 .323.105.593.314.806.233.24.554.363.953.363.306 0 .58-.08.816-.24.024.065.05.138.083.222.011.025.042.04.074.037l.46.008a.072.072 0 0 0 .047-.024c.01-.013.008-.028.008-.043M19.608 6.527h-.806v-4.01c0-.028-.028-.052-.061-.052h-.616c-.033 0-.061.024-.061.053v4.01c.016.353.322.638.728.686h.816c.034 0 .061-.023.061-.052V6.58c0-.03-.027-.053-.061-.053M22.22 3.143a.041.041 0 0 1-.04.042h-.675a.042.042 0 0 1-.042-.042V2.47c0-.023.019-.042.042-.042h.674c.023 0 .041.019.041.042zM14.22 5.101a.984.984 0 0 1 .223-.447.672.672 0 0 1 .525-.244c.206 0 .37.08.502.242.1.123.165.275.198.45zm1.734-1.063c-.237-.203-.552-.306-.937-.306-.546 0-.97.195-1.258.58-.244.322-.368.73-.368 1.213 0 .474.121.874.36 1.189.284.375.703.566 1.244.566.418 0 .928-.136 1.224-.275.027-.013.03-.036.03-.068l.004-.58a.06.06 0 0 0-.038-.029.069.069 0 0 0-.05.006c-.442.234-.857.27-1.157.27-.49 0-.751-.27-.797-.825h2.22c.035 0 .062-.023.062-.052 0-.805-.168-1.373-.538-1.69" fill="#3f474f"/></svg>
          

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
