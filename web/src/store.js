import {
  applyMiddleware,
  combineReducers,
  createStore
} from "redux"
import thunk from "redux-thunk"

// import reducers

const reducer = combineReducers({
  // reducer : reducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store
