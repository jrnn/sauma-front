import thunk from "redux-thunk"
import { applyMiddleware, combineReducers, createStore } from "redux"

import authReducer from "./reducer/auth_reducer"

const reducer = combineReducers({
  auth : authReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store
