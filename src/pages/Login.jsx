import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import Card from "../components/Card";

const Login = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("mahasiswa");
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, "password123", role);
  };

  return (
    <div className="login-container">
      <Card title="Masuk ECODAS" subtitle="Eco Digital Awareness System">
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email Kampus</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@student.ac.id"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Peran Pengguna</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-input"
            >
              <option value="mahasiswa">
                Mahasiswa (Awareness, Tracker, Behavior)
              </option>
              <option value="admin">
                Admin / Pengelola (Decision Support)
              </option>
            </select>
          </div>
          <Button type="submit" variant="primary" className="btn-full">
            Masuk
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
