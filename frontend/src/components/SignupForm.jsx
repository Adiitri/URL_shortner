import { useState } from 'react';
import { signup } from '../api/client';

export default function SignupForm({ onSignedUp }) {
  const [form, setForm] = useState({ firstname: '', lastname: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(form); // send info backend
      alert('user account created! Pls login');
      onSignedUp();       // tell parent to switch to the login view
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Create an account</h2>

      <input
        type="text"
        placeholder="First name"
        value={form.firstname}
        onChange={(e) => updateField('firstname', e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Last name (optional)"
        value={form.lastname}
        onChange={(e) => updateField('lastname', e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => updateField('email', e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password (min 8 characters) "
        value={form.password}
        onChange={(e) => updateField('password', e.target.value)}
        minLength={8}
        required
      />

      {error && <p className="error-text">{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Creating account...' : 'Sign up'}
      </button>
    </form>
  );
}
