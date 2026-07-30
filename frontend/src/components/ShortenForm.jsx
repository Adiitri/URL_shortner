import { useState } from 'react';
import { createShortUrl } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function ShortenForm({ onCreated }) {
  const { token } = useAuth();
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await createShortUrl(url, token);
      setUrl('');
      onCreated(); // tell parent to refresh the list
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="shorten-form" onSubmit={handleSubmit}>
      <input
        type="url"
        placeholder="Paste a long URL to shorten..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Shortening...' : 'Shorten'}
      </button>
      {error && <p className="error-text">{error}</p>}
    </form>
  );
}
