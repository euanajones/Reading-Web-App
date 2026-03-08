import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import { useAuth } from '../auth/AuthContext.jsx';
import './LoginForm.css';

function LoginForm() {
    const { login } = useAuth();

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        api.post('/users/login', {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        })
            .then(({ data }) => {
                login(data.token);
                setError(false);
                setSuccess(true);
            })
            .catch(() => {
                setError(true);
                setSuccess(false);
            });
    };

    return (
        <div className="login-card">
            <div className="login-card__corner-accent" />
            <p className="login-card__eyebrow">Login</p>
            <h1 className="login-card__heading">Welcome back,<br />Reader.</h1>
            <p className="login-card__subheading">Resume your literary journey</p>

            <div className="login-card__divider">
                <div className="login-card__divider-line" />
                <div className="login-card__divider-dot" />
                <div className="login-card__divider-line login-card__divider-line--reverse" />
            </div>

            <form onSubmit={handleSubmit}>
                <div className="login-form__field-group">
                    <label className="login-form__label">Email Address</label>
                    <input ref={emailRef} type="email" required className="login-form__input" />
                </div>

                <div className="login-form__field-group">
                    <label className="login-form__label">Password</label>
                    <input ref={passwordRef} type="password" required className="login-form__input" />
                </div>

                <button type="submit" className="login-form__button">
                    Login
                </button>

                <Link to="/register" className="login-form__label">
                    Don't have an account? Register here.
                </Link>

                {error && <p className="login-form__error">Login failed. Please try again.</p>}
                {success && <p className="login-form__success">Login successful!</p>}
            </form>
        </div>
    );
}

export default LoginForm;