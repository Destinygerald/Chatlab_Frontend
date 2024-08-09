import '../styles/auth.css'
import '../styles/auth_mobile.css'
import RegisterForm from '../components/logger/RegisterForm.jsx'

function Register () {
	return (
		<div className='auth'>
			<div className='auth-container'>
				<RegisterForm />
			</div>
			
			<div className='auth-img-container'>
				
			</div>
		</div>
	)
}

export default Register;