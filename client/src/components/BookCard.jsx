import { useState } from 'react';
import { BookmarkIcon } from '@phosphor-icons/react';
import './BookCard.css';

function BookCard( { title, author, pages, currentPage, currentlyReading } ) {

    const progress = pages > 0 ? Math.round((currentPage / pages) * 100) : 0;
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
                aria-label={currentlyReading ? 'Remove bookmark' : 'Bookmark'}
            >
                <BookmarkIcon
                    size={22}
                    weight={currentlyReading ? 'fill' : 'light'}
                    color={currentlyReading ? '#E8956D' : '#F5F0E8'}
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