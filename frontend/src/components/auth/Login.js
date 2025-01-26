import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import './Animation.css';


const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:2000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('isAdmin', data.isAdmin);
                localStorage.setItem('name', data.name);

                if (data.isAdmin) {
                    navigate('/admin-dashboard');
                } else {
                    navigate('/Dashboarduser');
                }
            } else {
                setError(data.error || 'Login failed.');
            }
        } catch (err) {
            setError('An error occurred during login.');
        }
    };

    const toggleModal = () => {
        setShowModal(!showModal);
        setError('');
    };

    const Modal = () => (
        <div className={`modal-overlay ${showModal ? 'show' : ''}`} onClick={toggleModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-left">
                    <div className="modal-real">
                        <h2>{isSignUp ? 'Create Account' : 'Welcome Back!'}</h2>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleSubmit} className="modal-form">
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter Email Address"
                                required
                                className="form-input"
                                autoComplete="username"
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter Password"
                                required
                                className="form-input"
                                autoComplete="current-password"
                            />
                        </div>

                        {!isSignUp && (
                            <div className="forgot-password">
                                <Link to="/Forgot-Password">Forgot your password?</Link>
                            </div>
                        )}

                        <button type="submit" className="submit-button">
                            {isSignUp ? 'Sign Up' : 'Sign In'}
                        </button>

                        <div className="toggle-form">
                            <p>
                                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                                {isSignUp ? (
                                    <button
                                        type="button"
                                        onClick={() => setIsSignUp(false)}
                                        className="toggle-button"
                                    > Sign In
                                    </button>
                                ) : (
                                    <Link to="/register" className="toggle-button">
                                        Sign Up
                                    </Link>
                                )}
                            </p>
                        </div>
                    </form>
                </div>
                <div className="modal-right">
                    <img
                        src="/images/login-pages.gif"
                        alt="Pizza Animation"
                        className="login-image"
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div className="login-page-container">
            <nav className="navbar">
                <div className="navbar-brand">
                    <Link to="/" className="brand-link">
                        <img src="/images/brandlogo.png" alt="Pizza Palette" className="logo-img" />
                    </Link>
                </div>
                <div className="navbar-links">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact Us</Link>
                </div>
                <div className="navbar-auth">
                    <button className="auth-button" onClick={toggleModal}>
                        Sign in / Sign up
                    </button>
                </div>
            </nav>

            <Modal />

            <div className="login-container">
                <div className="login-content">
                    <h1 className="hero-heading">It's Pizza Time!</h1>
                    <p className="hero-text">Craving for a pizza? You are in the right place!</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
