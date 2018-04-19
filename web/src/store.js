import thunk from "redux-thunk"
import {
  applyMiddleware,
  combineReducers,
  createStore
} from "redux"
import { composeWithDevTools } from "redux-devtools-extension"

import auth from "./reducer/auth"
import clientReducer from "./reducer/client"
import employees from "./reducer/employee"
import notification from "./reducer/notification"
import projectReducer from "./reducer/project"

const reducers = combineReducers({
  auth,
  clients : clientReducer,
  employees,
  notification,
  projects : projectReducer
})

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk))
)

export default store
