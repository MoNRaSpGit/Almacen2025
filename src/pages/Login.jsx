// src/pages/Login.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);

        try {
            const res = await fetch("https://backalmacen2025.onrender.com/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: username, password }),
            });

            if (!res.ok) {
                throw new Error("Credenciales inválidas");
            }

            const data = await res.json();
            localStorage.setItem("user", JSON.stringify(data));
            onLogin(data); // avisamos al padre
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="container py-5" style={{ maxWidth: "400px" }}>
            <h2 className="mb-4">Iniciar Sesión</h2>
            {error && <div className="alert alert-danger">{error}</div>}
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
                    <label className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Iniciar Sesión
                </button>
            </form>
            <p className="mt-3 text-center">
                <Link to="/register">Registrarse</Link>
            </p>
        </div>
    );
}
