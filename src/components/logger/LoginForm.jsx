import { useNavigate } from 'react-router-dom'

function LoginForm () {

	const navigate = useNavigate()

	function submitHandler (e) {
		e.preventDefault()
	}

	return (
		<div className='login-form'>
			<span className='form-hdr'> Login </span>

			<form className='form-cnt' onSubmit={submitHandler}>
				<input type='text' placeholder='Username' />
				<input type='password' placeholder='Password' />

				<button> Login </button>
			</form>

			<div className='form-alt' onClick={() => navigate('/signup')}>
				Don't have an account? Signup
			</div>

		</div>
	)
}

export default LoginForm