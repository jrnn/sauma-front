import thunk from "redux-thunk"
import {
  applyMiddleware,
  combineReducers,
  createStore
} from "redux"

import authReducer from "./reducer/auth_reducer"
import employeeReducer from "./reducer/employee"
import notificationReducer from "./reducer/notification_reducer"

const reducers = combineReducers({
  auth : authReducer,
  employees : employeeReducer,
  notification : notificationReducer
})

const store = createStore(
  reducers,
  applyMiddleware(thunk)
)

export default store
