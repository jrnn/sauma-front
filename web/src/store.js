import thunk from "redux-thunk"
import {
  applyMiddleware,
  combineReducers,
  createStore
} from "redux"
import { composeWithDevTools } from "redux-devtools-extension"

import authReducer from "./reducer/auth"
import clientReducer from "./reducer/client"
import employees from "./reducer/employee"
import notificationReducer from "./reducer/notification"
import projectReducer from "./reducer/project"

const reducers = combineReducers({
  auth : authReducer,
  clients : clientReducer,
  employees,
  notification : notificationReducer,
  projects : projectReducer
})

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk))
)

export default store
