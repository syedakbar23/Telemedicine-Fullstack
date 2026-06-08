import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      alert("⚠ Please fill in all required fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("⚠ Passwords do not match");
      return;
    }

    try {
      const base = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');
      const res = await axios.post(`${base}/api/auth/register`, {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      if (res.status === 200 || res.status === 201) {
        alert("✅ Registration successful! Redirecting to login...");
        navigate("/login");
      } else {
        alert("⚠ Unexpected response from server.");
      }
    } catch (err) {
      if (err.response?.status === 400) {
        alert("⚠ Invalid input or missing fields. Please check again.");
      } else if (err.response?.status === 409) {
        alert("⚠ Email already registered. Try logging in instead.");
        navigate("/login");
      } else {
        alert("❌ Server error during registration. Please try again later.");
      }
    }
  };

  return (
    <div style={outerStyle}>
      {/* SVG background matching the Login page */}
      <svg
        style={svgBgStyle}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#29ABE2" />
            <stop offset="100%" stopColor="#1a8fc0" />
          </linearGradient>
        </defs>
        <rect width="1440" height="900" fill="url(#bgGrad)" />

        {/* Network dots & lines */}
        {[
          [100, 150], [250, 300], [400, 180], [180, 450], [320, 520],
          [500, 380], [80, 600], [600, 250], [700, 420], [150, 700],
          [450, 650], [550, 150], [650, 550], [720, 100], [300, 750],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="4" fill="rgba(255,255,255,0.5)" />
        ))}

        {/* Connecting lines */}
        {[
          "M100,150 L250,300", "M250,300 L400,180", "M250,300 L180,450",
          "M180,450 L320,520", "M320,520 L500,380", "M400,180 L600,250",
          "M600,250 L700,420", "M500,380 L650,550", "M80,600 L150,700",
          "M150,700 L300,750", "M300,750 L450,650", "M450,650 L550,150",
          "M720,100 L600,250", "M100,150 L80,600",
        ].map((d, i) => (
          <path key={i} d={d} stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="none" />
        ))}

        {/* Large white plus (top-left) */}
        <g fill="white" opacity="0.9">
          <rect x="110" y="60" width="30" height="110" rx="4" />
          <rect x="65" y="105" width="120" height="30" rx="4" />
        </g>

        {/* Medium ghost plus (center-left) */}
        <g fill="white" opacity="0.2">
          <rect x="465" y="285" width="16" height="60" rx="3" />
          <rect x="441" y="309" width="64" height="16" rx="3" />
        </g>

        {/* Smaller ghost plus (lower-left) */}
        <g fill="white" opacity="0.15">
          <rect x="268" y="368" width="12" height="50" rx="3" />
          <rect x="248" y="388" width="52" height="12" rx="3" />
        </g>

        {/* Dot grid (lower-left area) */}
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 5 }).map((_, col) => (
            <circle
              key={`grid-${row}-${col}`}
              cx={85 + col * 22}
              cy={490 + row * 22}
              r="2.5"
              fill="rgba(255,255,255,0.4)"
            />
          ))
        )}
      </svg>

      {/* Register Card */}
      <div style={cardStyle}>
        <h2 style={titleStyle}>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            Register
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "15px" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ color: "#007BFF", fontWeight: "600", textDecoration: "none" }}
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

// --- Styles ---
const outerStyle = {
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  overflow: "hidden",
  fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
};

const svgBgStyle = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  zIndex: 0,
};

const cardStyle = {
  position: "relative",
  zIndex: 1,
  maxWidth: "420px",
  width: "100%",
  padding: "30px",
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
};

const titleStyle = {
  textAlign: "center",
  color: "#007BFF",
  marginBottom: "20px",
};

const inputStyle = {
  width: "100%",
  padding: "12px 15px",
  marginBottom: "15px",
  border: "1.5px solid #ccc",
  borderRadius: "8px",
  fontSize: "15px",
  boxSizing: "border-box",
  backgroundColor: "#3a3a3a",
  color: "#ccc",
  transition: "all 0.3s ease",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "#007BFF",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
};