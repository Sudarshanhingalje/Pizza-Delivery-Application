import React, { useState } from 'react';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call for password reset
        if (!email.includes('@')) {
            setError('Please enter a valid email');
            return;
        }
        console.log(`Password reset link sent to: ${email}`);
        setMessage('Password reset link has been sent to your email.');
        setError('');
    };

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                {error && <p className="error-message">{error}</p>}
                {message && <p className="success-message">{message}</p>}
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
