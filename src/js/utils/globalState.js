import PropTypes from "prop-types"
import {React, createContext, useContext, useReducer} from "react"

//setup for global states 
const defaultGlobalState = {
	invertColours: false
}
const globalStateContext = createContext(defaultGlobalState)
const dispatchStateContext = createContext(undefined)

const GlobalStateProvider = ({children}) => {
	const [state, dispatch] = useReducer(
		(state, newValue) => ({ ...state, ...newValue }),
		defaultGlobalState
	)
	return (
		<globalStateContext.Provider value={state}>
			<dispatchStateContext.Provider value={dispatch}>
				{children}
			</dispatchStateContext.Provider>
		</globalStateContext.Provider>
	)
}

const useGlobalState = () => [
	useContext(globalStateContext),
	useContext(dispatchStateContext)
]

GlobalStateProvider.propTypes = {
	children: PropTypes.node
}

export {GlobalStateProvider, useGlobalState}
