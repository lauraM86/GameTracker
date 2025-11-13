import { useState } from "react";
import axios from "axios";
import "../styles/Auth.css";

export default function Login({ setToken, setUsername }) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const endpoint = isRegister
        ? "http://localhost:4000/api/auth/register"
        : "http://localhost:4000/api/auth/login";

      const payload = isRegister
        ? { username, email, password }
        : { email, password };

      const res = await axios.post(endpoint, payload);

      if (!isRegister) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);

        setToken(res.data.token);
        setUsername(res.data.username);
      } else {
        alert("✅ Registro exitoso. Ahora inicia sesión.");
        setIsRegister(false);
        setUser("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      setError(err.response?.data?.message || "❌ Error en la autenticación.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isRegister ? "Crear cuenta" : "Iniciar sesión"}</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            {isRegister ? "Registrarse" : "Iniciar sesión"}
          </button>
        </form>

        <p>
          {isRegister
            ? "¿Ya tienes una cuenta? "
            : "¿No tienes una cuenta? "}
          <span
            className="toggle"
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
            }}
          >
            {isRegister ? "Inicia sesión" : "Regístrate"}
          </span>
        </p>
      </div>
    </div>
  );
}
