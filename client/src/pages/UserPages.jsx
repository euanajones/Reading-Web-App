import { Routes, Route, Link } from 'react-router-dom';
import BookList from '../components/BookList';

function Dashboard() {



    return (
        <>
            <h1>User's Bookshelf</h1>
            <p>Welcome to your dashboard!</p>
            <hr />
            <p>Currently Reading</p>
            <hr />
            <p>Pick Up Where You Left Off</p>
            <hr />
            <p>Search Your Library</p>
            <BookList />
        </>
    );
}

export default function UserPages() {
    return (
        <Routes>
            <Route path="/home" element={<Dashboard />} />
        </Routes>
    );
}