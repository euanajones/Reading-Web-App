import { Routes, Route, Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import './AuthPages.css';
import AddBookForm from '../components/AddBookCard';

function LoginPage() {
    return (
        <div className="auth-page">
            <LoginForm />
            {/* <Link to="/register">Don't have an account? Register here.</Link> */}
        </div>
    );
}

function RegisterPage() {
    return (
        <div className="auth-page">
            <RegisterForm />
            {/* <Link to="/login">Already have an account? Login here.</Link> */}
        </div>
    );
}

function TestPage() {
    return (
        <AddBookForm />
    );
}

export default function AuthPages() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/test" element={<TestPage />} />
        </Routes>
    );
}