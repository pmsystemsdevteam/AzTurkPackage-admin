import React, { useState } from "react";
import "./Main.scss";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [eye, setEye] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleEye = () => setEye(!eye);

  return (
    <section id="loginPage">
      <form>
        <h1> Macara Login </h1>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <div className="input-wrapper">
            <input
              type={eye ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
            />
            <span className="eye-icon" onClick={handleEye}>
              {eye ? <IoIosEyeOff /> : <IoIosEye />}
            </span>
          </div>
        </div>
        <button type="submit">
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
