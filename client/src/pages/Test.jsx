import { Routes, Route, Link } from 'react-router-dom';
import AddBookForm from '../components/AddBookCard';

function TestPage() {
    return (
        <AddBookForm />
    );
}

export default function AuthPages() {
    return (
        <Routes>
            <Route path="/test" element={<TestPage />} />
        </Routes>
    );
}