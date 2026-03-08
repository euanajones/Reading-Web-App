import { createContext, useContext, useState } from 'react';
import { saveToken, removeToken, getToken } from './api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(getToken());

    const login = (newToken) => {
        saveToken(newToken);
        setToken(newToken);
    };

    const logout = () => {
        removeToken();
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, isLoggedIn: !!token }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);