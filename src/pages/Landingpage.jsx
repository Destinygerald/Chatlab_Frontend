import '../styles/landingpage.css'
import { useNavigate } from 'react-router-dom'
import { Banner } from '../components/landingpage/Banner.jsx'
import { Reviews } from '../components/landingpage/Reviews.jsx'

function Topbar () {
	return (
		<div className='topbar'>
			<div className='topbar-logo'>ChatLab</div>

			<div className='topbar-cnt'>
				<span>Home</span>
				<span>Features</span>
				<span>FAQ</span>
			</div>

			<div className='topbar-btn'>
				<button>Log in</button>
			</div>
		</div>
	)
}





function Landingpage () {

	const navigate = useNavigate()

	return (
		<div className='landing-page'>
			<Topbar />
			<Banner />
			<Reviews />
		</div>
	)
}

export default Landingpage;