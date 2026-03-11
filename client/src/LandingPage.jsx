import './LandingPage.css';
import { BooksIcon, BookOpenIcon, BookBookmarkIcon, ListBulletsIcon, ArrowRightIcon } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const FEATURES = [
    {
        icon: <BookOpenIcon size={22} weight="light" />,
        title: 'Track Your Reading',
        body: 'Log every book you finish. Keep a living record of your reading life, page by page.',
    },
    {
        icon: <BookBookmarkIcon size={22} weight="light" />,
        title: 'Mark What Calls to You',
        body: 'Bookmark the books that catch your eye. Build a wishlist that grows with your curiosity.',
    },
    {
        icon: <ListBulletsIcon size={22} weight="light" />,
        title: 'Curate Your Lists',
        body: 'Organise your reading into lists for any mood, season, or subject. Your shelf, your rules.',
    },
    {
        icon: <BooksIcon size={22} weight="light" />,
        title: 'Your Library, Always',
        body: 'Everything you have ever read in one quiet, unhurried place. Nothing lost, nothing forgotten.',
    },
];

function LandingPage() {
    return (
        <div className="landing">
            <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet" />

            {/* ── NAV ── */}
            <nav className="landing-nav">
                <div className="landing-nav__logo">
                    <div className="landing-nav__logo-mark">F</div>
                    Folio
                </div>
                <div className="landing-nav__actions">
                    <Link to="/login" className="btn-ghost">Sign In</Link>
                    <Link to="/register" className="btn-primary">Get Started</Link>
                </div>
            </nav>

            {/* ── HERO ── */}
            <section className="hero">
                {/* Left */}
                <div className="hero__left">
                    <div className="hero__eyebrow">
                        <div className="hero__eyebrow-line" />
                        <span className="hero__eyebrow-text">Your reading life</span>
                    </div>

                    <h1 className="hero__heading">
                        Every book<br />
                        you've ever<br />
                        <em>loved,</em><br />
                        remembered.
                    </h1>

                    <p className="hero__body">
                        A quiet, unhurried place to track what you've read,
                        savour what you're reading, and find what calls to you next.
                    </p>

                    <div className="hero__actions">
                        <Link to="/register" className="btn-primary">
                            Begin Your Shelf
                            <ArrowRightIcon size={14} weight="regular" style={{ marginLeft: 8, verticalAlign: 'middle' }} />
                        </Link>
                        <Link to="/login" className="btn-ghost">Sign In</Link>
                    </div>

                    <div className="hero__stats">
                        <div className="hero__stat">
                            <span className="hero__stat-number">∞</span>
                            <span className="hero__stat-label">Books to track</span>
                        </div>
                        <div className="hero__stat-divider" />
                        <div className="hero__stat">
                            <span className="hero__stat-number">1</span>
                            <span className="hero__stat-label">Place for all of them</span>
                        </div>
                        <div className="hero__stat-divider" />
                        <div className="hero__stat">
                            <span className="hero__stat-number">0</span>
                            <span className="hero__stat-label">Books forgotten</span>
                        </div>
                    </div>
                </div>

                {/* Right — dark panel */}
                <div className="hero__right">
                    <div className="hero__rings" />
                    <div className="hero__spine" />

                    <div className="hero__book-stack">
                        {['#3D2314', '#2C1810', '#4A2C18', '#1A0E08', '#3A2010'].map((bg, i) => (
                            <div
                                key={i}
                                className="hero__book"
                                style={{
                                    background: bg,
                                    transform: `rotate(${(i - 2) * 3}deg) translateY(${i * 6}px)`,
                                    animationDelay: `${i * 0.08}s`,
                                    borderLeft: `4px solid ${i % 2 === 0 ? '#C4622D' : '#E8956D'}`,
                                }}
                            />
                        ))}
                    </div>

                    <blockquote className="hero__quote">
                        <p>"A reader lives a thousand lives before he dies. The man who never reads lives only one."</p>
                        <cite>— George R.R. Martin</cite>
                    </blockquote>
                </div>
            </section>

            {/* ── FEATURES ── */}
            <section className="features">
                <div className="features__header">
                    <div className="features__eyebrow">
                        <div className="features__eyebrow-line" />
                        <span className="features__eyebrow-text">What Folio does</span>
                        <div className="features__eyebrow-line" />
                    </div>
                    <h2 className="features__heading">
                        Built for readers who <em>care</em>
                    </h2>
                    <p className="features__subheading">
                        No noise, no social feeds. Just your books, beautifully kept.
                    </p>
                </div>

                <div className="features__grid">
                    {FEATURES.map((f, i) => (
                        <div className="feature-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                            <div className="feature-card__icon">{f.icon}</div>
                            <div className="feature-card__corner" />
                            <h3 className="feature-card__title">{f.title}</h3>
                            <p className="feature-card__body">{f.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer className="landing-footer">
                <div className="landing-footer__logo">
                    <div className="landing-nav__logo-mark">F</div>
                    Folio
                </div>
                <p className="landing-footer__copy">
                    Built with care for readers everywhere.
                </p>
            </footer>
        </div>
    );
}

export default LandingPage;