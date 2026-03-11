import { Routes, Route, Link } from 'react-router-dom';
import AddBookForm from '../components/AddBookCard';
import LandingPage from '../LandingPage';

function TestPage() {
    return (
        <AddBookForm />
    );
}

function Landing() {
    return (
        <>
            <LandingPage />
        </>
    );
}

export default function AuthPages() {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/test" element={<TestPage />} />
        </Routes>
    );
}