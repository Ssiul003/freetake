import React, { useState } from 'react';

export default function LoginForm({ handleForgotPassword, handleLogin }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onSubmit = (e) => {
		e.preventDefault();
		handleLogin(email, password);
	};

	return (
		<form onSubmit={onSubmit}>
			<div>
				<label>Email:</label>
				<input
					type="email"
					name="email"
					placeholder="Enter your email"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div>
				<label>Password:</label>
				<input
					type="password"
					name="password"
					placeholder="Enter your password"
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<button className="login-submit-btn" type="submit">Login</button>
			<p>
				<button
					className="forgot-password-btn"
					type="button"
					onClick={handleForgotPassword}
				>
					Forgot Password?
				</button>
			</p>
		</form>
	);
}
