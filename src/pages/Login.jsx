import '../styles/auth.css'
import '../styles/auth_mobile.css'
import LoginForm from '../components/logger/LoginForm.jsx'

function Login () {
	return (
		<div className='auth'>
			<div className='auth-container'>
				<LoginForm />
			</div>
			
			<div className='auth-img-container'>
				
			</div>
		</div>
	)
}

export default Login;