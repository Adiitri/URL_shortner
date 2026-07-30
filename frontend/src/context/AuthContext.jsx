import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Wrap the app with this so any component can read the token
// or log in/out without passing props down manually.
export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  function loginWithToken(newToken) {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  }

  function logout() {
    localStorage.removeItem('token');
    setToken(null);
  }

  const value = {
    token,
    isAuthenticated: Boolean(token),
    loginWithToken,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside <AuthProvider>');
  return context;
}
