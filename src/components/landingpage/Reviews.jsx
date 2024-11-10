import '../../styles/landingpage.css'
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from 'react-icons/io'

function ReviewsCard ({ cnt, pic, name, ratings }) {
	return (
		<div className='reviews-card'>
			<div className='reviews-card-cnt'>{cnt}</div>

			<div className='reviews-card-info'>
				<div>
					<img src={pic} />
				</div>

				<div>
					<span>{name}</span>

					<div>
						{
							
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export function Reviews () {
	return (
		<div className='reviews'>
			<div className='reviews-hdr'>
				<span>Reviews from Chatlabs users!</span>
				<span>See why people love us.</span>
			</div>

			<div className='reviews-cnt'>
				<ReviewsCard />
				<ReviewsCard />
			</div>

		</div>
	)
}