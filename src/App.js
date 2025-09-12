import React from "react"
import ColourMatch from "./components/pages/ColourMatch"
import "./App.css"
import { logEvent } from "firebase/analytics"
import { analytics } from "./index"


function App() {
	logEvent(analytics, "homepage_accessed")
	return (
		<div>
			<ColourMatch/>
		</div>
	)
}
export default App