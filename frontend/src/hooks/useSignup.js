import { useState } from "react";
import { validateEmail, validatePassword } from "../utility/validation";

export const useSignupStates = () => {
	const [formInput, setFormInput] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		firstName: '',
		lastName: '',
		address: ''
	});

	const [formError, setFormError] = useState({
		username: true,
		email: true,
		password: true,
		confirmPassword: true
	});

	const [showPassword, setShowPassword] = useState(false);
	const toggleShowPassword = () => {setShowPassword(!showPassword)}

	const handleSignupInput = (e) => {
		const { name, value } = e.target;
		setFormInput(prev => ({ ...prev, [name]: value }));

		var newFormError = { ...formError };

		if (name === 'confirmPassword' && (value === '' || formInput.password !== value)) {
			newFormError.confirmPassword = true;
		} else if (name === 'confirmPassword') {
			newFormError.confirmPassword = false;
		}

		if (name === 'username' && (value === '' || value.length < 6)) {
			newFormError.username = true;
		} else if (name === 'username') {
			newFormError.username = false;
		}

		if (name === 'email' && (value === '' || !validateEmail(value))) {
			newFormError.email = true;
		} else if (name === 'email') {
			newFormError.email = false;
		}

		if (name === 'password' && !validatePassword(value)) {
			newFormError.password = true;
		} else if (name === 'password') {
			newFormError.password = false;
		}

		setFormError(newFormError);
	}

	const handleSignup = async (e) => {
		e.preventDefault();

		if (formError.username || formError.email || formError.password || formError.confirmPassword) {
			return;
		}

		try {
			const res = await fetch('http://localhost:3000/user/new', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					username: formInput.username,
					email: formInput.email,
					password: formInput.password,
					firstName: formInput.firstName,
					lastName: formInput.lastName,
					address: formInput.address
				})
			});

			const data = await res.json();

			if (!res.ok) {
				alert(`Error: ${data.message}`)
			} else {
				alert('Account Created!')
				setFormInput({
					username: '',
					email: '',
					password: '',
					confirmPassword: '',
					firstName: '',
					lastName: '',
					address: ''
				});
			}
		} catch (error) {
			alert(`Error: ${error}`);
		}
	}

	return {
		formInput,
		formError,
		handleSignupInput,
		handleSignup,
		showPassword,
		toggleShowPassword
	}
}