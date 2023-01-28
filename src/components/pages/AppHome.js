import React from "react"
import winston from "winston"
import { WinstonProvider } from "winston-react"
import Home from "./Home"

const logger = winston.createLogger({
	transports: [new winston.transports.Console()]
})

function AppHome() {
	return (
		<WinstonProvider logger={logger}>
			<div>
				<Home />
			</div>
		</WinstonProvider>
	)
}
export default AppHome