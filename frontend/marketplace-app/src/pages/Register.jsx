import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiPost } from "../api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
      navigate("/browse");
    } catch (err) {
      setError(err.message);
    } finally {
      setRegistering(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Sign up with campus email</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                type="text"
                value={first_name}
                placeholder="e.g. John"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );

  // return (
  //   <div>
  //     <h1>Register</h1>
  //     {error ? <div>Error: {error}</div> : null}

  //     <form onSubmit={handleRegister}>
  //       <div>
  //         <label>
  //           First Name
  //           <input
  //             type="text"
  //             value={first_name}
  //             onChange={(e) => setFirstName(e.target.value)}
  //             style={{
  //               display: "block",
  //               width: "100%",
  //               padding: 8,
  //               marginTop: 6,
  //             }}
  //           />
  //         </label>
  //       </div>
  //       <div>
  //         <label>
  //           Last Name
  //           <input
  //             type="text"
  //             value={last_name}
  //             onChange={(e) => setLastName(e.target.value)}
  //             style={{
  //               display: "block",
  //               width: "100%",
  //               padding: 8,
  //               marginTop: 6,
  //             }}
  //           />
  //         </label>
  //       </div>
  //       <div>
  //         <label>
  //           Email
  //           <input
  //             type="email"
  //             value={email}
  //             onChange={(e) => setEmail(e.target.value)}
  //             style={{
  //               display: "block",
  //               width: "100%",
  //               padding: 8,
  //               marginTop: 6,
  //             }}
  //           />
  //         </label>
  //       </div>
  //       <div>
  //         <label>
  //           Password
  //           <input
  //             type="password"
  //             value={password}
  //             onChange={(e) => setPassword(e.target.value)}
  //             style={{
  //               display: "block",
  //               width: "100%",
  //               padding: 8,
  //               marginTop: 6,
  //             }}
  //           />
  //         </label>
  //       </div>
  //       <div>
  //         <label>
  //           Confirm Password
  //           <input
  //             type="password"
  //             value={confirmPassword}
  //             onChange={(e) => setConfirmPassword(e.target.value)}
  //             style={{
  //               display: "block",
  //               width: "100%",
  //               padding: 8,
  //               marginTop: 6,
  //             }}
  //           />
  //         </label>
  //       </div>

  //       <button type="submit" disabled={registering}>
  //         {registering ? "Registering..." : "Register"}
  //       </button>
  //     </form>
  //     <div><Link to="/"><p>Have an account?</p></Link></div>
  //   </div>
  // );
}
