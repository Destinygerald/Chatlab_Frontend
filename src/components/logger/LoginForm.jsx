import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { login } from '../../api/auth.js'
import { loginEmitter } from '../../api/emitter.js'
import { socket } from '../../socket.js'

function LoginForm () {

	const [ userLogin, setUserLogin ] = useState({
		email: '',
		password: ''
	})

	const [ loading, setLoading ] = useState(false)

	const navigate = useNavigate()

	async function submitHandler (e) {
		e.preventDefault()

		setLoading(true)
		try {
			const res = await login(userLogin)

			if (res.status == 200) {
				socket.auth = { userId: res?.data?.data?.id }
				socket.connect()

				loginEmitter()
				navigate('/dashboard')
			}
		} catch (err) {
			console.error(err)
		}

		setTimeout(() => {
			setLoading(false)
		}, 1500)
	}

	function changeHandler (e) {
		setUserLogin({ ...userLogin, [e.target.name]: e.target.value})
	}

	return (
		<div className='login-form'>
			<span className='form-hdr'> Login </span>

			<form className='form-cnt' onSubmit={submitHandler}>
				<input type='email' name='email' placeholder='Email' value={userLogin.email} onChange={changeHandler} />
				<input type='password' name='password' placeholder='Password' value={userLogin.password} onChange={changeHandler} />

				{
					loading
					?
					<button className='loading'> <div /> </button>
					:
					<button> Login </button>
				}
			</form>

			<div className='form-alt' onClick={() => navigate('/signup')}>
				Don't have an account? Signup
			</div>

		</div>
	)
}

export default LoginForm