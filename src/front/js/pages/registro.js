import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getState } from '../flux/store';

export function Registro() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState(""); // Para mostrar mensajes de error
    const navigate = useNavigate();
    const { actions } = getState(); // Accede a las acciones del store

    const handleRegistro = async (e) => {
        e.preventDefault();

        if (password !== password2) {
            setError("Las contraseñas no coinciden");
            return;
        }

        try {
            const success = await actions.registro({ name, email, password, address });

            if (success) {
                alert("Registro exitoso");
                navigate("/dashboard");  // Redirige a la página de inicio o donde desees
            } else {
                setError("Error al registrar el usuario");
            }
        } catch (error) {
            console.error("Error al registrar el usuario:", error);
            setError("Error al registrar el usuario");
        }
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleRegistro} noValidate>
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
                    <label className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-control"
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
                <div className="mb-3">
                    <label className="form-label">Dirección:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary">Registrarse</button>
            </form>
        </div>
    );
}

export default Registro;