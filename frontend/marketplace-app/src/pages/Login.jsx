import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
        <div></div>
      </form>
    </div>
  );
}
