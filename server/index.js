const express = require("express")

const app = express()
const port = 5000

app.get("/api", (req, res) => {
	res.json({ message: "backend" })
})

app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})
