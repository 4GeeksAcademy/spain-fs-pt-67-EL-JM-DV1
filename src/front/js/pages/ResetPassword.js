import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
    const { token } = useParams(); // Assuming the token is passed as a URL parameter
    const [password, setPassword] = useState('');
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
            const response = await fetch(process.env.BACKEND_URL + '/api/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, password })
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
        <div className="container mt-5">
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="password">New Password:</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="form-control"
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
                <button type="submit" className="btn btn-primary mt-3">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;

