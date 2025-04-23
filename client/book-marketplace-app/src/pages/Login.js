import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return alert('Please enter email and password');
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5050/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Logged in successfully!');
        localStorage.setItem('token', data.token);
        localStorage.setItem('user_id', data.user_id);

        // ✅ Decode JWT
        const decoded = jwtDecode(data.token);
        const name = decoded.name;
        const role = decoded.role;
        localStorage.setItem('role', role);

        // ✅ Conditional redirect
        if (role === 'admin') {
          navigate('/admin/verify');
        } else {
          navigate('/welcome', { state: { name } });
        }

      } else {
        alert(data.msg || 'Login failed');
      }
    } catch (err) {
      alert('Error connecting to server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="checkbox-row">
            <input
              type="checkbox"
              id="show-password"
              checked={showPassword}
              onChange={() => setShowPassword(prev => !prev)}
            />
            <label htmlFor="show-password">Display Password</label>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        <div className="extra-links">
          <a href="#">Forgot Your Password?</a>
          <p>
            Don't have an account? <a href="/signup">Sign up here</a>
          </p>
        </div>
      </div>
    </div>
  );
}
