import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';


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
            console.log('Login attempted with:', formData);
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/PizzaBuilder');
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };

    const toggleModal = () => {
        setShowModal(!showModal);
        setError('');
    };

    const Modal = () => (
        <div className={`modal-overlay ${showModal ? 'show' : ''}`} onClick={toggleModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={toggleModal}>&times;</button>
                <div className="modal-header">
                    <h2>{isSignUp ? 'Create Account' : 'Welcome Back!'}</h2>
                    <p>{isSignUp ? 'Join our pizza family!' : "You've been Missed!"}</p>
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
                        {isSignUp ? 'Sign Up' : 'Login'}
                    </button>

                    <div className="toggle-form">
                        <p>
                            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                            {isSignUp ? (
                                <button
                                    type="button"
                                    onClick={() => setIsSignUp(false)}
                                    className="toggle-button"
                                >
                                    Sign In
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
        </div>
    );

    return (
        <div className="login-page">
            <nav className="nav-header">
                <div className="nav-brand">
                    <Link to="/" className="brand-link">
                        <img src="/images/pizza-logo.png" alt="Pizza Palette" className="brand-logo" />
                        <span className="brand-name">Pizza House</span>
                    </Link>
                </div>
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/OrderHistory">My Orders</Link>
                </div>
                <div className="nav-auth">
                    <button className="login-register-btn" onClick={toggleModal}>
                        Sign in / Sign up
                    </button>
                </div>
            </nav>

            <Modal />

            <div className="login-container">
                <div className="login-content">
                    <div className="login-illustration">
                        <img src="/images/pizza-box.jpg" alt="Pizza Box" className="pizza-icon" />
                    </div>
                    <h1 className="hero-heading">
                        It's Pizza Time!
                    </h1>
                    <p className="hero-text">Craving for a pizza? You are in the right place!</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
