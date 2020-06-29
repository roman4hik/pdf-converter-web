import { combineReducers } from 'redux'
import { appReducer } from './components/App/reducer'

export const rootReducer = combineReducers({
    app: appReducer,
});