import { useRef, useState } from 'react';
import api, { saveToken } from './api';

function RegisterForm() {
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
                saveToken(data.token);
                setError(false);
                setSuccess(true);
            })
            .catch(() => {
                setError(true);
                setSuccess(false);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input ref={usernameRef} type="text" placeholder="Username" required />
            <input ref={emailRef} type="email" placeholder="Email" required />
            <input ref={firstNameRef} type="text" placeholder="First Name" required />
            <input ref={lastNameRef} type="text" placeholder="Last Name" required />
            <input ref={passwordRef} type="password" placeholder="Password" required />
            <button type="submit">Register</button>
            {error && <p>Registration failed. Please try again.</p>}
            {success && <p>Registration successful!</p>}
        </form>
    );
}

export default RegisterForm;