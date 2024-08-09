import '../styles/landingpage.css'
import { useNavigate } from 'react-router-dom'
import AnimatedChats from '../components/landingpage/AnimatedChats.jsx'

function Topbar () {
	return (
		<div className='topbar'>
			<div className='topbar-logo'>ChatLab</div>

			<div className='topbar-cnt'>
				<span>Home</span>
				<span>Features</span>
				<span>Contact us</span>
			</div>

			<div className='topbar-btn'>
				<button>Sign in</button>
				<button>Log in</button>
			</div>
		</div>
	)
}

function AnimationContent () {
	return (
		<div className='animation-cnt'>
			<div className='animation-bg'>
				<div /> 
				<div />
			</div>

			<AnimatedChats />
		</div>
	)
}

function LandingpageContent () {
	return (
		<div className='landing-page-cnt'>
			<div className='cnt-hdr'>Connect with your Friends easily</div>

			<div className='cnt-txt'>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit donec consectetur semper nunc in molestie. 

				Sed velit lectus, porttitor eu convallis sit amet, semper eget mauris. Integer in pulvinar mauris. Donec facilisis placerat magna sed cursus. Mauris vel tristique arcu. Duis congue orci id libero dictum sollicitudin.
			</div>

			<AnimationContent />
		</div>
	)
}





function Landingpage () {

	const navigate = useNavigate()

	return (
		<div className='landing-page'>
			<Topbar />

			<LandingpageContent />	
		</div>
	)
}

export default Landingpage;