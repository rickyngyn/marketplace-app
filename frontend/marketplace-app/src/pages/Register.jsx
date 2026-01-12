import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {apiPost} from "../api"


export default function Register() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const[error, setError] = useState("");
  const[registering, setRegistering] = useState(false);

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
            email: email.trim(),
            password: password,
        });

        localStorage.setItem("token", register.token);
        localStorage.setItem("user", JSON.stringify(register.user));
        navigate("/");
    } catch (err) {
        setError(err.message);
    } finally {
        setRegistering(false);
    }
  }

  return <div>Register Page - To be implemented</div>;
}
