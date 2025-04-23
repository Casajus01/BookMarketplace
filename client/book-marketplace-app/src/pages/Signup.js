import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]     = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      return alert('Please fill in all fields');
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5050/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          email,
          password
        })
      });

      const data = await res.json();
      if (res.ok) {
        alert('Account created!');
        navigate('/login');
      } else {
        alert(data.msg || 'Signup failed');
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
        <h2>Account Registration</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
          <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
          <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <div className="checkbox-row">
            <input type="checkbox" id="show-password" checked={showPassword} onChange={() => setShowPassword(prev => !prev)} />
            <label htmlFor="show-password">Show Password</label>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>

        <div className="extra-links">
          <p>Already have an account? <a href="/login">Log in here</a></p>
        </div>
      </div>
    </div>
  );
}
