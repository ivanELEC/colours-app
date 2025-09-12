import React from "react"
import ReactDOM from "react-dom"
import { GlobalStateProvider } from "./js/utils/globalState"
import { Switch, Route, BrowserRouter as Router } from "react-router-dom"

import Mix from "./components/pages/Mix"
import App from "./App"
// Firebase/GA dependencies
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"

//Styling
import "./index.css"

//Load fonts
import "./fonts/HelveticaNeueCyr-Bold.ttf"
import "./fonts/HelveticaNeueCyr-Light.ttf"



//Firebase configuration
const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket:process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}


// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

const routing = (
	<div>
		<Router>
			<Switch><Route exact path="/" component={App} /></Switch>
			<Switch><Route exact path="/Mix/:id" component={Mix} /></Switch>
		</Router>
	</div>
)

ReactDOM.render(
	<GlobalStateProvider>
		{routing}
	</GlobalStateProvider>,
	document.getElementById("root")
)

export {analytics}