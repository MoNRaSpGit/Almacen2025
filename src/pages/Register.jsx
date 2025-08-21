// src/pages/Register.jsx
import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [direccion, setDireccion] = useState("");
  const [message, setMessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);

    try {
      const res = await fetch("https://backalmacen2025.onrender.com/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: username,
          password,
          direccion,
        }),
      });

      if (!res.ok) throw new Error("Error al registrarse");

      setMessage("✅ Registro exitoso, ya podés iniciar sesión.");
      setUsername("");
      setPassword("");
      setDireccion("");
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  }

  return (
    <div className="container py-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4">Registro</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Usuario</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            type="text"
            className="form-control"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Registrarse
        </button>
      </form>
      <p className="mt-3 text-center">
        <a href="/">Volver al login</a>
      </p>
    </div>
  );
}
