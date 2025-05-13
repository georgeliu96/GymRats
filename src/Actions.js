import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./Actions.css"
import { collection, addDoc, updateDoc, doc } from "firebase/firestore"
import { useState } from "react"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

const Actions = ({ fetchUsers, db, users }) => {
	const NEW_USER = "NEW USER"

	const [tray, setTray] = useState(false)
	const [name, setName] = useState(NEW_USER)
	const [newName, setNewName] = useState("")
	const [checkins, setCheckins] = useState(0)

	const openTray = () => setTray(true)
	const closeTray = () => setTray(false)

	const handleSelectName = (e) => {
		const selectedName = e.target.value
		setName(selectedName)

		if (users.map(({ id }) => id).includes(selectedName)) {
			const currentUser = users.find(({ id }) => id === selectedName)

			setCheckins(currentUser.checkins)
			setNewName(currentUser.name)
		} else {
			setCheckins(0)
			setNewName("")
		}
	}

	const handleNewName = (e) => {
		setNewName(e.target.value)
	}

	const handleCheckins = (e) => {
		setCheckins(e.target.value)
	}

	const submitForm = async () => {
		const isEdit = name !== NEW_USER

		if (isEdit) {
			const docRef = doc(db, "users", name)
			await updateDoc(docRef, {
				checkins,
				name: newName,
			})
		} else {
			await addDoc(collection(db, "users"), {
				name: newName,
				checkins,
			})
		}

		fetchUsers()
		closeTray()
	}

	return (
		<section>
			<div
				className={`${tray ? "showTray" : "hideTray"} trayContainer`}
				onClick={closeTray}>
				<div className='tray' onClick={(e) => e.stopPropagation()}>
					<h4>Edit Sessions</h4>
					<FontAwesomeIcon icon={faXmark} onClick={closeTray} />
					<div className='form'>
						<label>Edit Sessions For?</label>
						<select onChange={handleSelectName} value={name}>
							<option value={NEW_USER}>NEW USER</option>
							{users?.map(({ name, id }, index) => (
								<option value={id} key={index}>
									{name}
								</option>
							))}
						</select>
						<label>Name</label>
						<input
							type='text'
							onChange={handleNewName}
							value={newName}
						/>
						<label>Sessions</label>
						<input
							type='number'
							onChange={handleCheckins}
							value={checkins}
						/>
					</div>
					<button className='button' onClick={submitForm}>
						SUBMIT
					</button>
				</div>
			</div>
			<button className='button' onClick={openTray}>
				EDIT
			</button>
		</section>
	)
}

export default Actions
