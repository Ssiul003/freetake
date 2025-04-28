export default function LoginForm(
	{
		handleForgotPassword
	}
){
	return(
		<form>
			<div>
				<label>Email:</label>
				<input
					type="email"
					name="email"
					placeholder="Enter your email"
					required />
			</div>
			<div>
				<label>Password: </label>
				<input
					type="password"
					name="password"
					placeholder="Enter your password"
					required />
			</div>
			<button type="submit">Login</button>
			<p>
				<button className="forgot-password-btn" onClick={handleForgotPassword}>
					Forgot Password?
				</button>
			</p>
		</form>
	)
}