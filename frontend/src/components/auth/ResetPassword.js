import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Add routing support
import './ResetPassword.css';

const ResetPassword = () => {
    const { token } = useParams(); // Extract token from URL
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch('http://localhost:2000/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, password }), // Sending token and new password
            });

            const result = await response.json();

            if (response.ok) {
                setMessage(result.message); // Display success message
                setTimeout(() => {
                    navigate('/login'); // Redirect to login page after successful reset
                }, 2000);
            } else {
                setError(result.error || 'Error resetting password');
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            setError('Server error. Please try again later.');
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Reset Your Password</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="password">New Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                {message && <p className="success">{message}</p>}
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;
