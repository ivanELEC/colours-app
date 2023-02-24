import React from "react"
import ReactDOM from "react-dom"
import { Switch, Route, BrowserRouter as Router } from "react-router-dom"
import "./index.css"
import Mix from "./components/pages/Mix"
import ColourMatch from "./components/pages/ColourMatch"
import Footer from "./components/navigation/Footer"
//load fonts
import "./fonts/HelveticaNeueCyr-Bold.ttf"
import "./fonts/HelveticaNeueCyr-Light.ttf"

//scale page
document.body.style.zoom = 0.85

const routing = (
	<div>
		<Router>
			<Switch><Route exact path="/" component={ColourMatch} /></Switch>
			<Switch><Route exact path="/Mix/:id" component={Mix} /></Switch>
			<Footer/>
		</Router>
	</div>
)

ReactDOM.render(routing, document.getElementById("root"))
