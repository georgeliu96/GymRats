import moment from "moment"

export const isPreviousWeek = (timestamp) => {
	const now = moment()
	const lastCheckin = moment(timestamp)

	return now.week() > lastCheckin.week()
}

export const appendNames = (names) => {
	if (names.length === 1) return names[0]
	if (names.length === 2) return `${names[0]} and ${names[1]}`

	const lastIndex = names.length - 1

	names[lastIndex] = `and ${names[lastIndex]}`

	return names.join(", ")
}
