import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import Header from "./Header";

function Register() {
  const [registered, setRegistered] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);

    setUsername("");
    setPassword("");
    setEmail("");
    setRegistered(true);
  };

  if (registered) {
    return (
      alert("Registered Successfully !!!!!!"),
      <Navigate to="/" />
    );
  }

  return (
    <>
    <Header/>
      <div className="register-page">
        <div className="register-container">
          <h1>Register</h1>
          <form className="register-form" onSubmit={handleSubmit}>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
            <input
              type="email"
              id="username"
              placeholder="Email Id"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              maxLength={8}
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <button type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;