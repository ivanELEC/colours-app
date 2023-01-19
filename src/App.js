import React from "react"
import winston from "winston"
import { WinstonProvider } from "winston-react"
import Home from "./components/pages/Home"
import "./App.css"

const logger = winston.createLogger({
    transports: [new winston.transports.Console()]
})

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
