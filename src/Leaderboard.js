import "./Leaderboard.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faChartSimple,
	faMedal,
	faSpinner,
} from "@fortawesome/free-solid-svg-icons"

const Leaderboard = ({ users, loading }) => {
	const medals = (index) => {
		const colors = ["gold", "silver", "bronze"]

		if (index < 3) {
			return (
				<FontAwesomeIcon
					icon={faMedal}
					className={`medal ${colors[index]}`}
				/>
			)
		}
	}

	const sorted = users.sort((a, b) => b.checkins - a.checkins)

	return (
		<section className='Leaderboard'>
			<header className='header'>
				<FontAwesomeIcon icon={faChartSimple} />
				Leaderboard
			</header>
			{loading ? (
				<FontAwesomeIcon className='spinner' icon={faSpinner} />
			) : (
				<div className='grid'>
					{sorted.map(({ name, checkins }, index) => (
						<div className='gridItem' key={index}>
							{medals(index)}
							<em>{index + 1}.</em>
							<div>
								{name}: {checkins}
							</div>
						</div>
					))}
				</div>
			)}
		</section>
	)
}

export default Leaderboard
