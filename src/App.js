import "./App.css"
import { useState, useEffect, useCallback } from "react"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { collection, getDocs, getFirestore } from "firebase/firestore"
import Leaderboard from "./Leaderboard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDumbbell } from "@fortawesome/free-solid-svg-icons"
import Actions from "./Actions"
import Rules from "./Rules"
import { appendNames, isPreviousWeek } from "./util"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAXZ_bI8xuuDEO7bOZTKTXeYZqQ7XlSKAw",
	authDomain: "gymrats-590f2.firebaseapp.com",
	projectId: "gymrats-590f2",
	storageBucket: "gymrats-590f2.firebasestorage.app",
	messagingSenderId: "285236880861",
	appId: "1:285236880861:web:903687a9d7188b70784234",
}

function App() {
	// Initialize Firebase
	const app = initializeApp(firebaseConfig)
	const db = getFirestore(app)

	const [users, setUsers] = useState([])
	const [loading, setLoading] = useState(false)
	const [tray, setTray] = useState(false)
	const [showCopied, setShowCopied] = useState(false)

	const fetchUsers = useCallback(async () => {
		setLoading(true)
		await getDocs(collection(db, "users")).then((snapshot) => {
			const data = snapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}))

			setUsers(data)
			setLoading(false)
		})
	}, [db])

	useEffect(() => {
		fetchUsers()
	}, [db, fetchUsers])

	const anyLate = () =>
		users.some(({ lastModifiedTimestamp }) =>
			isPreviousWeek(lastModifiedTimestamp)
		)

	const generateAnnouncement = () => {
		const lateUsers = users.filter(({ lastModifiedTimestamp }) =>
			isPreviousWeek(lastModifiedTimestamp)
		)

		const names = lateUsers.map(({ name }) => name)

		return `${appendNames(names)} ${
			names.length > 1 ? "have" : "has"
		} not updated in over a week. Please visit https://gymrats-590f2.web.app/ and update your checkins!`
	}

	const copyAnnouncement = async () => {
		const announcement = generateAnnouncement()

		await navigator.clipboard.writeText(announcement)
		setShowCopied(true)

		setTimeout(() => {
			setShowCopied(false)
		}, 1000)
	}

	return (
		<div className='App'>
			<header className='App-header'>
				<h1>Gym Rats</h1>
				<FontAwesomeIcon icon={faDumbbell} />
			</header>
			<Leaderboard users={users} loading={loading} />
			<Actions users={users} db={db} fetchUsers={fetchUsers} />
			<div className='rules' onClick={() => setTray(true)}>
				Terms & Conditions
			</div>
			{anyLate() ? (
				<div className='generate' onClick={() => copyAnnouncement()}>
					Generate Announcement
				</div>
			) : null}
			<Rules showTray={tray} closeTray={() => setTray(false)} />
			<div className={`copied ${showCopied ? "show" : ""}`}>
				Copied To Clipboard
			</div>
			<img src='./gym-rats.png' className='bgLogo' alt='background' />
		</div>
	)
}

export default App
