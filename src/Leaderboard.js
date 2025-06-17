import "./Leaderboard.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faChartSimple,
	faMedal,
	faSpinner,
	faWarning,
} from "@fortawesome/free-solid-svg-icons"
import { isPreviousWeek } from "./util"

const Leaderboard = ({ users, loading }) => {
	const medals = (rank) => {
		const colors = [null, "gold", "silver", "bronze"]

		if (rank <= 3) {
			return (
				<FontAwesomeIcon
					icon={faMedal}
					className={`medal ${colors[rank]}`}
				/>
			)
		}
	}

	const sorted = users.sort((a, b) => b.checkins - a.checkins)
	sorted.forEach(
		(user, index) =>
			(sorted[index] = {
				...user,
				rank:
					parseInt(user.checkins) ===
					parseInt(sorted[index - 1]?.checkins)
						? sorted[index - 1].rank
						: index + 1,
			})
	)

	const warning = (lastModifiedTimestamp) => {
		return (
			<div title={lastModifiedTimestamp}>
				<FontAwesomeIcon icon={faWarning} className='warning' />
			</div>
		)
	}

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
					<section className='headerRow'>
						<div></div>
						<div>Rank</div>
						<div>Name</div>
						<div>Sessions</div>
					</section>
					{sorted.map(
						(
							{ name, checkins, rank, lastModifiedTimestamp },
							index
						) => (
							<div className='gridItem' key={index}>
								<div>{medals(rank)}</div>
								<em>{rank}.</em>
								<div>{name}</div>
								<div className={"checkins"}>
									<div>{checkins}</div>
									{isPreviousWeek(lastModifiedTimestamp)
										? warning(lastModifiedTimestamp)
										: null}
								</div>
							</div>
						)
					)}
				</div>
			)}
		</section>
	)
}

export default Leaderboard
