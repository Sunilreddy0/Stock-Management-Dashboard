import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "./Header";
import { useAuth } from "../AuthGaurd";

function LoginPage() {

  const [loggedIn, setLoggedIn] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);

    setUsername("");
    setPassword("");
    setLoggedIn(true);
  };

  if (loggedIn) {
    return <Navigate to="/stock-list" />;
  }

  return (
    <>
    <Header/>
      <div className="login-page">
        <div className="login-container">
          <h1>Login</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
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
            <button type="submit" id="login-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
