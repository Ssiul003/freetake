export default function SignupForm(
	{
		formInput,
		formError,
		handleSignupInput,
		handleSignup,
		showPassword,
		toggleShowPassword
	}
) {
	return (
		<div>
			<form className='authentication-form'>
				<CustomField
					label="Username"
					name="username"
					type="text"
					placeholder="Enter your username"
					errorMessage="Username must be a minimum of 6 characters"
					minLength={6}
					formInput={formInput}
					formError={formError}
					handleSignupInput={handleSignupInput}
				/>
				<CustomField
					label="Email"
					name="email"
					type="email"
					placeholder="Enter your email"
					errorMessage="Invalid email"
					formInput={formInput}
					formError={formError}
					handleSignupInput={handleSignupInput}
				/>
				<CustomField
					label="First Name"
					name="firstName"
					type="text"
					placeholder="Enter your first name"
					formInput={formInput}
					formError={formError}
					handleSignupInput={handleSignupInput}
				/>
				<CustomField
					label="Last Name"
					name="lastName"
					type="text"
					placeholder="Enter your last name"
					formInput={formInput}
					formError={formError}
					handleSignupInput={handleSignupInput}
				/>
				<CustomField
					label="Group ID"
					name="groupId"
					type="number"
					placeholder="Enter Group ID"
					errorMessage="Group ID must be a number"
					formInput={formInput}
					formError={formError}
					handleSignupInput={handleSignupInput}
				/>
				<CustomField
					label="Password"
					name="password"
					type={showPassword ? "text" : "password"}
					placeholder="Requires 8 minimum characters, 1 number, and 1 letter"
					errorMessage="Password is too weak"
					minLength={8}
					formInput={formInput}
					formError={formError}
					handleSignupInput={handleSignupInput}
					showPassword={showPassword}
					toggleShowPassword={toggleShowPassword}
				/>
				<CustomField
					label="Confirm Password"
					name="confirmPassword"
					type={showPassword ? "text" : "password"}
					placeholder="Requires 8 minimum characters, 1 number, and 1 letter"
					errorMessage="Password does not match"
					minLength={8}
					formInput={formInput}
					formError={formError}
					handleSignupInput={handleSignupInput}
					showPassword={showPassword}
					toggleShowPassword={toggleShowPassword}
				/>
				<button type="submit" onClick={handleSignup} >Sign Up</button>
			</form>
		</div>
	)
}

const CustomField = ( {
	label,
	name,
	type,
	placeholder,
	errorMessage = 'An error has occurred',
	minLength = 1,
	formInput,
	formError,
	handleSignupInput,
	showPassword = false,
	toggleShowPassword = null
} ) => {
	return(
		<div>
			<label>{label}:
				<p onClick={toggleShowPassword}>{showPassword ? "hide password?" : "show password?"}</p>
			</label>
			<input
				name={name}
				type={type}
				className={formInput[name] && (formError[name] ? "error" : 'correct')}
				placeholder={placeholder}
				value={formInput[name]}
				onChange={handleSignupInput}
				minLength={minLength}
				required
			/>
			<p className='error-message'>{errorMessage}</p>
			<p className='correct-message'>Looks good!</p>
		</div>
	)
}