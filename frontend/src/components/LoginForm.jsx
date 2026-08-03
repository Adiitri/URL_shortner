import { useState } from 'react';
import { login} from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function LoginForm() {
  const { loginWithToken } = useAuth();
  const [ form , setForm] =  useState({ email: '', password: '' } );
  const [error, setError] = useState('');
  const [loading , setLoading] = useState(false);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try{
      const { token } = await login(form); //email,password is input
      loginWithToken(token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Log in</h2>

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => updateField('email', e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => updateField('password', e.target.value)}
        required
      />

      
        {error && <p className="error-text" > {error} </p> }  

      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Log in'}
      </button>
    </form>
    );
}
