import './Signup.css';

export default function Signup() {
  return (
    <div className="auth-bg">
      <div className="auth-box">
        <h2>Account Registration</h2>
        <form>
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />

          <div className="checkbox-row">
            <input type="checkbox" id="show-password" />
            <label htmlFor="show-password">Show Password</label>
          </div>

          <h4 className="section-title">Security Questions</h4>

          <label>What city were you born in?</label>
          <input type="text" placeholder="City" />

          <label>Who is your favorite author?</label>
          <input type="text" placeholder="Author" />

          <button type="submit">Create Account</button>
        </form>

        <div className="extra-links">
          <p>Already have an account? <a href="/login">Log in here</a></p>
        </div>
      </div>
    </div>
  );
}

