import React from "react"
import ReactDOM from "react-dom"
import { Switch, Route, BrowserRouter as Router } from "react-router-dom"
import { CookiesProvider } from "react-cookie"
import "./index.css"
import Mix from "./components/pages/Mix"
import App from "./App"
//load fonts
import "./fonts/HelveticaNeueCyr-Bold.ttf"
import "./fonts/HelveticaNeueCyr-Light.ttf"

const routing = (
	<div>
		<Router>
			<Switch><Route exact path="/" component={App} /></Switch>
			<Switch><Route exact path="/Mix/:id" component={Mix} /></Switch>
		</Router>
	</div>
)

ReactDOM.render(
	<CookiesProvider>
		{routing}
	</CookiesProvider>, 
	document.getElementById("root")
)
