import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        { username, password }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);

      if (decoded.role === "pelanggan") {
        navigate("/");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error?.response);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.role === "pelanggan") {
        navigate("/", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    }
  }, []);

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login/google`,
        { token: credentialResponse.credential }
      );

      const token = response.data.token;
      const decoded = jwtDecode(token);

      localStorage.setItem("token", token);

      if (decoded.role === "pelanggan") {
        navigate("/");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* LEFT */}
        <div className="login-logo">
          <h2>PeTIK Niaga</h2>
          <p>Solusi belanja mudah & terpercaya</p>
        </div>

        {/* RIGHT */}
        <form onSubmit={handleSubmit} className="login-form">
          <h3>Login</h3>

          <div className="login-field">
            <label>Username</label>
            <input
              type="text"
              placeholder="Masukkan Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="login-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Masukkan Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn-login">Masuk</button>

          <span>Atau login dengan Google</span>

          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.log("Login gagal")}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;