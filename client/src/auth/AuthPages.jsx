import { Routes, Route, Link } from 'react-router-dom';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';

function LoginPage() {
    return (
        <div>
            <LoginForm />
            <Link to="/register">Don't have an account? Register here.</Link>
        </div>
    );
}

function RegisterPage() {
    return (
        <div>
            <RegisterForm />
            <Link to="/login">Already have an account? Login here.</Link>
        </div>
    );
}

export default function AuthPages() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
    );
}