import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Registro() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verifica si las contraseñas coinciden
        if (password !== password2) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        // Estructura el cuerpo de la solicitud
        const requestBody = {
            name:name,
            address:address,
            email:email,
            password:password,
            is_active: true
        };

        try {
            const response = await fetch(process.env.BACKEND_URL + `/api/registro`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();

            if (response.status === 409) {
                setError(data.msg || "El email ya está registrado. Intente con uno diferente.");
                return;
            }

            if (!response.ok) {
                setError(data.msg || "Error al registrar al usuario.");
                return;
            }

            console.log("Usuario creado con éxito:", data);
            navigate("/home");

        } catch (error) {
            console.error("Error en la solicitud:", error);
            setError("Error al registrar al usuario.");
        }
    };

    return (
        <div className="container mt-5">
            <form noValidate onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Direccion:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="nombre@ejemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Contraseña:</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Confirmar Contraseña:</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-outline-dark">
                    Registrar
                </button>

                {/* Muestra el mensaje de error debajo del botón */}
                {error && <div className="alert alert-danger mt-3">{error}</div>}
            </form>
        </div>
    );
}

export default Registro;
