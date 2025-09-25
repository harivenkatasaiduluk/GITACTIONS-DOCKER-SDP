import { useState } from "react";
import "./farmer.css"; // Ensure this path is correct
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../config";
import { useAuth } from "../contextapi/AuthContext";
import { Link } from "react-router-dom";

export default function FarmerLogin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setIsFarmerLoggedIn } = useAuth();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${config.url}/farmer/checkfarmerlogin`,
        formData
      );
      if (response.status === 200) {
        setIsFarmerLoggedIn(true);
        sessionStorage.setItem('farmer', JSON.stringify(response.data)); // Store farmer data in sessionStorage
        navigate("/farmerhome");
      } else {
        setMessage(response.data);
      }
    } catch (error) {
      setError(error.response?.data || "An unexpected error occurred.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>
          <span className="signin-text">SignIn</span>&nbsp;
          <span className="signup-text">SignUp</span>
        </h2>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Email</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="options">
            <div style={{ display: "flex", alignItems: "center" }}>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="#" className="forgot-password">
              Forgot Password?
            </a>
          </div>

          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>
        <div className="signup-section">
          <p className="signup-text">New to AgroDirect?</p>
          <Link to="/contact" className="signup-button">
            Register as Farmer
          </Link>
          <p className="signup-info">
            Contact our admin team for platform access
          </p>
        </div>
      </div>
    </div>
  );
}
