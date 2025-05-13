import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./Rules.css"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

const Rules = ({ closeTray, showTray }) => {
	const text = `All gym rats must show photo proof of gym attendance, for a minimum 3 times a week. 
• If gym rats misses quota, they must venmo fellow gym rats $5 each. 
• Layaway days will not be excused. Gym rats must meet quota of 3 gym check ins every week. 
• Missed gym rats must pay fees to fellow gym rats on following Monday of missed week. Please do not be late with payments and honor gym rats code! 
• 1 session per day is allowed for gym rats check in. 
• The only situations that are allowed non payments are- travel (please inform gym rats a week ahead of time idea you will be traveling), extreme emergencies, and sicknesses. 
• Each weekly cycle begins Monday and ends Sunday. 
• Gym rats must commit to 3 months periods at a time. Dropping out at random time periods during these 6 months due to reasons outside of those listed above, will not be excused. 
• What counts as gym rats check in: gym session, fitness classes, sports sessions.
• What does not count as gym rats check in: long walks or hikes. 
• One meal, paid for and split by all remaining gym rats, will be paid for- for the gym rat with the highest gym check in by the end of the 3 month period.
`

	const lines = text.split("• ")

	return (
		<div
			className={`${showTray ? "showTray" : "hideTray"} trayContainer`}
			onClick={closeTray}>
			<div className='tray' onClick={(e) => e.stopPropagation()}>
				<h4>The New Gym Rules 2025</h4>
				<h5>Current Session: May 5, 2025 to August 3, 2025</h5>
				<FontAwesomeIcon icon={faXmark} onClick={closeTray} />
				{lines.map((line, index) => (
					<div key={index}>• {line}</div>
				))}
			</div>
		</div>
	)
}

export default Rules
