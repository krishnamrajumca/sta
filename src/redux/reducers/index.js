import { combineReducers } from 'redux'
import metaReducer from './metaReducer'

function loader(state = false, action) {
    switch (action.type) {
        case "LOADER":
            return action.payload
        default:
            return state
    }
}
const rootReducer = combineReducers({
    metaReducer,
    loader
})
export default rootReducer