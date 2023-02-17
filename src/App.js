import React from "react"
import winston from "winston"
import { WinstonProvider } from "winston-react"
import Home from "./components/pages/Home"
import "./App.css"

const logger = winston.createLogger({
	transports: [new winston.transports.Console()]
})

//scale page
document.body.style.zoom = 0.85

function App() {
	return (
		<WinstonProvider logger={logger}>
			<div>
				<Home />
			</div>
		</WinstonProvider>
	)
}
export default App
