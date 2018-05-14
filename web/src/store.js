import thunk from "redux-thunk"
import {
  applyMiddleware,
  combineReducers,
  createStore
} from "redux"
import { composeWithDevTools } from "redux-devtools-extension"

import auth from "./reducer/auth"
import employees from "./reducer/employee"
import notification from "./reducer/notification"
import projects from "./reducer/project"

import {
  activities,
  clients,
  materials,
  tasks
} from "./reducer/standard_reducers"

const reducers = combineReducers({
  activities,
  auth,
  clients,
  employees,
  materials,
  notification,
  projects,
  tasks
})

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk))
)

export default store
