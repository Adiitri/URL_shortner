import { useEffect, useState, useCallback } from 'react';
import { useAuth } from './context/AuthContext';
import { getMyUrls, deleteUrl } from './api/client';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ShortenForm from './components/ShortenForm';
import UrlList from './components/UrlList';
import './App.css';

export default function App() {
  const { isAuthenticated, token, logout } = useAuth();

  // Toggle between login/ signup 
  const [showSignup, setShowSignup] = useState(false);

  const [urls, setUrls] = useState([]);
  const [loadingUrls, setLoadingUrls] = useState(false);
  const [listError, setListError] = useState('');

  const refreshUrls = useCallback(async () => {
    if (!token) return;
    setLoadingUrls(true);
    setListError('');
    try {
      const { codes } = await getMyUrls(token);
      setUrls(codes);
    } 
    catch (err){
      setListError(err.message);
    } finally{
      setLoadingUrls(false);
  }
}, [token]);

  useEffect(() => {
    if (isAuthenticated) refreshUrls();
  }, [ isAuthenticated, refreshUrls]);

  async function handleDelete(id) {
    try {
      await deleteUrl(id, token);
      setUrls((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setListError(err.message);
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="page">
        <h1>URL Shortener</h1>
        {showSignup ? (
          <>
            <SignupForm onSignedUp={() => setShowSignup(false)} />
            <p className="switch-text">
              Already have an account?{' '}
              <button className="link-btn" onClick={() => setShowSignup(false)}>
                Log in
              </button>
            </p>
          </>
        ) : (
          <>
            <LoginForm />
            <p className="switch-text">
              Need an account?{' '}
              <button className="link-btn" onClick={() => setShowSignup(true)}>
                Sign up
              </button>
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="page">
       <div className="header-row">
        <h1>URL Shortener</h1>

        <button className="link-btn" onClick={logout}>
          Log out
        </button>
      </div>

      <ShortenForm onCreated= {refreshUrls} />

      {loadingUrls && <p className="empty-text">Loading your links . ..</p>}
      {listError && <p className="error-text">{listError} </p>}
      {!loadingUrls && <UrlList urls={urls} onDelete={handleDelete} />}
    </div>
  );
}
