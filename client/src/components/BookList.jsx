import { useState, useEffect } from 'react';
import api from '../../api';
import BookCard from './BookCard';

function BookList() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchBooks = () => {
        api.get('/books').then(({ data }) => {
            setBooks(data);
            setLoading(false);
        }).catch(() => {
            setError(true);
            setLoading(false);
        });
    }

    useEffect(() => {
        fetchBooks();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Failed to load books.</p>;

    return (
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {books.map((book) => (
                <BookCard key={book.id} book={book} onRefresh={fetchBooks} />
            ))}
        </div>
    );
}

export default BookList;
