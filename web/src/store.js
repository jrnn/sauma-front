import thunk from "redux-thunk"
import {
  applyMiddleware,
  combineReducers,
  createStore
} from "redux"
import { composeWithDevTools } from "redux-devtools-extension"

import authReducer from "./reducer/auth"
import clientReducer from "./reducer/client"
import employeeReducer from "./reducer/employee"
import notificationReducer from "./reducer/notification"

const reducers = combineReducers({
  auth : authReducer,
  clients : clientReducer,
  employees : employeeReducer,
  notification : notificationReducer
})

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk))
)

export default store
