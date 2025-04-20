import './Login.css';

export default function Login() {
  return (
    <div className="auth-bg">
      <div className="auth-box">
        <h2>Login</h2>
        <form>
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
          <div className="checkbox-row">
            <input type="checkbox" id="show-password" />
            <label htmlFor="show-password">Display Password</label>
          </div>
          <button type="submit">Log In</button>
        </form>
        <div className="extra-links">
          <a href="#">Forgot Your Password?</a>
          <p>Don't have an account? <a href="/signup">Sign up here</a></p>
        </div>
      </div>
    </div>
  );
}
