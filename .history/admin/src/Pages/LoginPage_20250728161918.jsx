import React, { useState } from "react";
import "./Main.scss";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [eye, setEye] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEye = () => setEye(!eye);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://192.168.30.73:8000/api/auth/token/", {
        username: formData.username,
        password: formData.password,
      });

      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.detail || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="loginPage">
      <form onSubmit={handleSubmit}>
        <h1>Macara Login</h1>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <div className="input-wrapper">
            <input
              type={eye ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className="eye-icon" onClick={handleEye}>
              {eye ? <IoIosEyeOff /> : <IoIosEye />}
            </span>
          </div>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? (
            <img
              src="https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator_large.gif"
              alt="loading"
            />
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </section>
  );
}

export default LoginPage;
