import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../api";

export default function Register() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [registering, setRegistering] = useState(false);

  const navigate = useNavigate();
  async function handleRegister(e) {
    e.preventDefault();
    setError("");

    if (!first_name.trim()) {
      setError("First name is required");
      return;
    }
    if (!last_name.trim()) {
      setError("Last name is required");
      return;
    }
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setRegistering(true);

    try {
      const register = await apiPost("/api/auth/register", {
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        email: email.trim().toLowerCase(),
        password: password,
      });

      if (register.token) localStorage.setItem("token", register.token);
      if (register.user)
        localStorage.setItem("user", JSON.stringify(register.user));
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setRegistering(false);
    }
  }

  return (
    <div>
      <h1>Register</h1>
      {error ? <div>Error: {error}</div> : null}

      <form onSubmit={handleRegister}>
        <div>
          <label>
            First Name
            <input
              type="text"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
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
            Last Name
            <input
              type="text"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
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
            Password
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
        <div>
          <label>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                display: "block",
                width: "100%",
                padding: 8,
                marginTop: 6,
              }}
            />
          </label>
        </div>

        <button type="submit" disabled={registering}>
          {registering ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
