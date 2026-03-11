import { useState } from 'react';
import { BookmarkIcon } from '@phosphor-icons/react';
import './BookCard.css';
import api from '../../api';

function BookCard( { book, onRefresh } ) {

    const { id, title, author, current_page, pages, currently_reading } = book;

    const [bookmark, setBookmark] = useState(currently_reading);

    const progress = Math.round((current_page / pages) * 100);

    const toggleBookmark = () => {
        const newBookmarkState = !bookmark;

        setBookmark(newBookmarkState);

        api.patch(`/books/${id}`, { currently_reading: newBookmarkState })
            .then(() => {
                onRefresh();
            })
            .catch(() => {
                setBookmark(!newBookmarkState);
            });
    };

    return (
        <div className="book-card">

            <div className="book-card__cover-placeholder">
                <span className="book-card__cover-placeholder-text">
                    {title}
                </span>
            </div>

            {/* Bookmark toggle */}
            <button
                className="book-card__bookmark"
                aria-label={currently_reading ? 'Remove bookmark' : 'Bookmark'}
                onClick={toggleBookmark}
            >
                <BookmarkIcon
                    size={22}
                    weight={currently_reading ? 'fill' : 'light'}
                    color={currently_reading ? '#E8956D' : '#F5F0E8'}
                />
            </button>

            {/* Hover overlay */}
            <div className="book-card__overlay">
                <div className="book-card__info">
                    <p className="book-card__title">{title}</p>
                    <p className="book-card__author">{author}</p>

                    <div className="book-card__progress">
                        <div className="book-card__progress-bar-track">
                            <div
                                className="book-card__progress-bar-fill"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <p className="book-card__progress-label">
                            <span>{progress}%</span> read
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default BookCard;