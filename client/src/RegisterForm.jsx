import { useRef, useState } from 'react';
import axios from 'axios';

function RegisterForm() {
    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const passwordRef = useRef(null);

    const [token, setToken] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
         
        const username = usernameRef.current.value;
        const email = emailRef.current.value;
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const password = passwordRef.current.value;

        axios.post('http://localhost:8000/user/create', { username, email, first_name: firstName, last_name: lastName, password })
            .then(({ data }) => {
                setError(false);
                setToken(data.token);
            })
            .catch(() => {
                setError(true);
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <input ref={usernameRef} type="text" placeholder="Username" required />
            <input ref={emailRef} type="email" placeholder="Email" required />
            <input ref={firstNameRef} type="text" placeholder="First Name" required />
            <input ref={lastNameRef} type="text" placeholder="Last Name" required />
            <input ref={passwordRef} type="password" placeholder="Password" required />
            <button type="submit">Register</button>
            {error && <p>Registration failed. Please try again.</p>}
            {token && <p>Registration successful! Your token: {token}</p>}
        </form>
    );
}

export default RegisterForm;