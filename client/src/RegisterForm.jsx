import { useRef, useState } from 'react';
import api from '../api';
import { useAuth } from './auth/AuthContext.jsx';
import './RegisterForm.css';

function RegisterForm() {
    const { login } = useAuth();

    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const passwordRef = useRef(null);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        api.post('/users/create', {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            first_name: firstNameRef.current.value,
            last_name: lastNameRef.current.value,
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
        <div className="register-page">
            <div className="register-card">
                <div className="register-card__corner-accent" />
                <p className="register-card__eyebrow">Create Account</p>
                <h1 className="register-card__heading">Welcome,<br />Reader.</h1>
                <p className="register-card__subheading">Begin your literary journey</p>

                <div className="register-card__divider">
                    <div className="register-card__divider-line" />
                    <div className="register-card__divider-dot" />
                    <div className="register-card__divider-line register-card__divider-line--reverse" />
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="register-form__field-group">
                        <label className="register-form__label">Username</label>
                        <input ref={usernameRef} type="text" required className="register-form__input" />
                    </div>

                    <div className="register-form__field-group">
                        <label className="register-form__label">Email Address</label>
                        <input ref={emailRef} type="email" required className="register-form__input" />
                    </div>

                    <div className="register-form__row">
                        <div>
                            <label className="register-form__label">First Name</label>
                            <input ref={firstNameRef} type="text" required className="register-form__input" />
                        </div>
                        <div>
                            <label className="register-form__label">Last Name</label>
                            <input ref={lastNameRef} type="text" required className="register-form__input" />
                        </div>
                    </div>

                    <div className="register-form__field-group">
                        <label className="register-form__label">Password</label>
                        <input ref={passwordRef} type="password" required className="register-form__input" />
                    </div>

                    <button type="submit" className="register-form__button">
                        Create Account
                    </button>

                    {error && <p className="register-form__error">Registration failed. Please try again.</p>}
                    {success && <p className="register-form__success">Registration successful!</p>}
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;