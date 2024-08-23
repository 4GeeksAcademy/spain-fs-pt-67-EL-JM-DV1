import React, { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch(process.env.BACKEND_URL + '/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "token": token, "password": password })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Password reset successfully. You can now log in.");
                setError('');
                navigate("/login");
            } else {
                setError(data.message || "Error resetting password.");
                setMessage('');
            }
        } catch (error) {
            setError("There was an error processing your request.");
            setMessage('');
        }
    };

    return (
        <div className="container mt-5" style={{ 'maxWidth': '500px' }}>
            <h2 className='red-text'>Redefinir Contraseña</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="password">Nueva Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control red-border"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="form-control red-border"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                {message && (
                    <div className="alert alert-success mt-3">
                        {message}
                    </div>
                )}
                {error && (
                    <div className="alert alert-danger mt-3">
                        {error}
                    </div>
                )}
                <div className='d-flex justify-content-center'>
                    <button type="submit" className="btn special-btn2 mt-3">Confirmar</button>
                </div>
            </form>
        </div>
    );
};

export default ResetPassword;

