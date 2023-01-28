import React from "react"
import { Switch, Route, BrowserRouter as Router } from "react-router-dom"
import winston from "winston"
import AppHome from "./components/pages/AppHome"
import Mix from "./components/pages/Mix"
import ColourDifference from "./components/pages/ColourDifference"
import ColourMatch from "./components/pages/ColourMatch"
import Footer from "./components/navigation/Footer"
import "./App.css"

function App() {
	return  (
		<div>
			<Router>
				<Switch><Route exact path="/" component={AppHome} /></Switch>
				<Switch><Route exact path="/Mix/:id" component={Mix} /></Switch>
				<Switch><Route exact path="/ColourDifference" component={ColourDifference} /></Switch>
				<Switch><Route exact path="/ColourMatch" component={ColourMatch} /></Switch>
				<Footer/>
			</Router>
		</div>
	)
}
export default App
