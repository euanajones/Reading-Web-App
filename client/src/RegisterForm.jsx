import { useRef, useState } from 'react';
import api, { saveToken } from '../api';

function RegisterForm() {
    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const passwordRef = useRef(null);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        api.post('/users/create', {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            first_name: firstNameRef.current.value,
            last_name: lastNameRef.current.value,
            password: passwordRef.current.value,
        })
            .then(({ data }) => {
                saveToken(data.token);
                setError(false);
                setSuccess(true);
            })
            .catch(() => {
                setError(true);
                setSuccess(false);
            });
    };

    const styles = {
        page: {
            minHeight: '100vh',
            background: '#F5F0E8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: '"Playfair Display", "Georgia", serif',
            backgroundImage: `radial-gradient(ellipse at 20% 50%, #E8956D22 0%, transparent 60%),
                              radial-gradient(ellipse at 80% 20%, #C4622D18 0%, transparent 50%)`,
        },
        card: {
            background: '#FDFAF4',
            border: '1px solid #E2D5C3',
            borderRadius: '2px',
            padding: '56px 52px',
            width: '100%',
            maxWidth: '420px',
            boxShadow: '0 4px 40px #C4622D18, 0 1px 4px #00000008',
            position: 'relative',
        },
        cornerAccent: {
            position: 'absolute',
            top: '12px',
            left: '12px',
            right: '12px',
            bottom: '12px',
            border: '1px solid #E8956D44',
            borderRadius: '1px',
            pointerEvents: 'none',
        },
        eyebrow: {
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#C4622D',
            marginBottom: '8px',
            fontFamily: '"Georgia", serif',
        },
        heading: {
            fontSize: '32px',
            fontWeight: '700',
            color: '#2C1810',
            marginBottom: '6px',
            lineHeight: '1.15',
            letterSpacing: '-0.02em',
        },
        subheading: {
            fontSize: '13px',
            color: '#9C8570',
            marginBottom: '36px',
            fontFamily: '"Georgia", serif',
            fontStyle: 'italic',
        },
        divider: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '28px',
        },
        dividerLine: {
            flex: 1,
            height: '1px',
            background: 'linear-gradient(to right, transparent, #E2D5C3)',
        },
        dividerDot: {
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: '#C4622D',
            opacity: 0.5,
        },
        fieldGroup: {
            marginBottom: '18px',
        },
        label: {
            display: 'block',
            fontSize: '10px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#7A6553',
            marginBottom: '6px',
            fontFamily: '"Georgia", serif',
        },
        input: {
            width: '100%',
            padding: '11px 14px',
            background: '#FAF6EE',
            border: '1px solid #DDD0BC',
            borderRadius: '2px',
            fontSize: '14px',
            color: '#2C1810',
            fontFamily: '"Playfair Display", "Georgia", serif',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 0.2s, box-shadow 0.2s',
        },
        row: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '14px',
        },
        button: {
            width: '100%',
            padding: '14px',
            background: 'linear-gradient(135deg, #C4622D 0%, #E8956D 100%)',
            color: '#FDF8F0',
            border: 'none',
            borderRadius: '2px',
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontFamily: '"Georgia", serif',
            cursor: 'pointer',
            marginTop: '28px',
            transition: 'opacity 0.2s, transform 0.1s',
        },
        success: {
            marginTop: '16px',
            padding: '12px 16px',
            background: '#F0F7F0',
            border: '1px solid #B8D4B8',
            borderRadius: '2px',
            color: '#3A6B3A',
            fontSize: '13px',
            fontStyle: 'italic',
            textAlign: 'center',
        },
        errorMsg: {
            marginTop: '16px',
            padding: '12px 16px',
            background: '#FDF0EC',
            border: '1px solid #E8C4B4',
            borderRadius: '2px',
            color: '#8B3A1E',
            fontSize: '13px',
            fontStyle: 'italic',
            textAlign: 'center',
        },
    };

    const handleFocus = (e) => {
        e.target.style.borderColor = '#C4622D';
        e.target.style.boxShadow = '0 0 0 3px #C4622D14';
    };
    const handleBlur = (e) => {
        e.target.style.borderColor = '#DDD0BC';
        e.target.style.boxShadow = 'none';
    };

    return (
        <div style={styles.page}>
            <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet" />
            <div style={styles.card}>
                <div style={styles.cornerAccent} />
                <p style={styles.eyebrow}>Create Account</p>
                <h1 style={styles.heading}>Welcome,<br />Reader.</h1>
                <p style={styles.subheading}>Begin your literary journey</p>

                <div style={styles.divider}>
                    <div style={{ ...styles.dividerLine, background: 'linear-gradient(to right, transparent, #E2D5C3)' }} />
                    <div style={styles.dividerDot} />
                    <div style={{ ...styles.dividerLine, background: 'linear-gradient(to left, transparent, #E2D5C3)' }} />
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={styles.fieldGroup}>
                        <label style={styles.label}>Username</label>
                        <input ref={usernameRef} type="text" required style={styles.input} onFocus={handleFocus} onBlur={handleBlur} />
                    </div>

                    <div style={styles.fieldGroup}>
                        <label style={styles.label}>Email Address</label>
                        <input ref={emailRef} type="email" required style={styles.input} onFocus={handleFocus} onBlur={handleBlur} />
                    </div>

                    <div style={{ ...styles.fieldGroup, ...styles.row }}>
                        <div>
                            <label style={styles.label}>First Name</label>
                            <input ref={firstNameRef} type="text" required style={styles.input} onFocus={handleFocus} onBlur={handleBlur} />
                        </div>
                        <div>
                            <label style={styles.label}>Last Name</label>
                            <input ref={lastNameRef} type="text" required style={styles.input} onFocus={handleFocus} onBlur={handleBlur} />
                        </div>
                    </div>

                    <div style={styles.fieldGroup}>
                        <label style={styles.label}>Password</label>
                        <input ref={passwordRef} type="password" required style={styles.input} onFocus={handleFocus} onBlur={handleBlur} />
                    </div>

                    <button
                        type="submit"
                        style={styles.button}
                        onMouseEnter={e => e.target.style.opacity = '0.88'}
                        onMouseLeave={e => e.target.style.opacity = '1'}
                    >
                        Create Account
                    </button>

                    {error && <p style={styles.errorMsg}>Registration failed. Please try again.</p>}
                    {success && <p style={styles.success}>Registration successful!</p>}
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;