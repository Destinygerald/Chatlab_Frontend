import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function RegInput ({ type, value, name, placeholder, changeEvent, errMsg, blurEvent, focusEvent, blurred }) {

	return (
		<div className='reg-input'>
			<input name={name} type={type} placeholder={placeholder} value={value} onChange={changeEvent} onBlur={blurEvent} />
			{ errMsg && <span className='reg-err'> {errMsg} </span> }
		</div>
	)
}


function RegisterForm () {

	const [ signup, setSignup ] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	})

	const navigate = useNavigate()

	function submitHandler (e) {
		e.preventDefault()
	}

	function changeHandler (e) {
		setSignup({ ...signup, [e.target.name]: e.target.value })
	}

	return (
		<div className='login-form'>
			<span className='form-hdr'> Sign Up </span>

			<form className='form-cnt' onSubmit={submitHandler}>
				<input name='username' type='text' value={signup.username} placeholder='Username' onChange={changeHandler} />
				<input name='email' type='email' value={signup.email} placeholder='Email' onChange={changeHandler} />
				<input name='password' type='password' value={signup.password} placeholder='Password' onChange={changeHandler} />
				<input name='confirmPassword' type='password' value={signup.confirmPassword} placeholder='Confirm Password' onChange={changeHandler} />

				<button> Login </button>
			</form>

			<div className='form-alt' onClick={() => navigate('/login')}>
				Already have an account? Login
			</div>

		</div>
	)
}

export default RegisterForm