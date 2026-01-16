import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiPost } from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    setLoggingIn(true);

    try {
      const login = await apiPost("/api/auth/login", {
        email: email.trim().toLowerCase(),
        password: password,
      });

      if (login.token) localStorage.setItem("token", login.token);
      if (login.user) localStorage.setItem("user", JSON.stringify(login.user));
      navigate("/browse");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoggingIn(false);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      {error ? <div>{error}</div> : null}

      <form onSubmit={handleLogin}>
        <div>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                display: "block",
                width: "100%",
                padding: 8,
                marginTop: 6,
              }}
            />
          </label>
        </div>
        <div>
          <label>
            Password{" "}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                display: "block",
                width: "100%",
                padding: 8,
                marginTop: 6,
              }}
            />
          </label>
        </div>
        <button type="submit" disabled={loggingIn}>
          {loggingIn ? "Logging in..." : "Login"}
        </button>
      </form>
      <div>
        <Link to="/register">
          <p>Don't have an account?</p>
        </Link>
      </div>
    </div>
  );
}
