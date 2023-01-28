import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"

//load fonts
import "./fonts/HelveticaNeueCyr-Bold.ttf"
import "./fonts/HelveticaNeueCyr-Light.ttf"

const application = (
	<div>
		<App/>
	</div>
)

ReactDOM.render(application, document.getElementById("root"))
