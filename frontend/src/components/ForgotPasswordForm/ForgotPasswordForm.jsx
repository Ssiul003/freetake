export default function ForgotPasswordForm(
	{
		handlePasswordReset,
		onClick
	}
){
	return(
		<div>
			<h2>Reset Your Password</h2>
				<form className='authentication-form' onSubmit={handlePasswordReset}>
					<div>
						<label>Email: </label>
						<input
							type="email"
							placeholder="Enter your email"
							required />
					</div>
					<button type="submit">Send Reset Link</button>
				</form>
			<button className="back-to-login-btn" onClick={onClick}>Back To Login?</button>
		</div>
	);
}