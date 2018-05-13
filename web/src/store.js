import thunk from "redux-thunk"
import {
  applyMiddleware,
  combineReducers,
  createStore
} from "redux"
import { composeWithDevTools } from "redux-devtools-extension"

import activities from "./reducer/activity"
import auth from "./reducer/auth"
import clients from "./reducer/client"
import employees from "./reducer/employee"
import materials from "./reducer/material"
import notification from "./reducer/notification"
import projects from "./reducer/project"
import tasks from "./reducer/task"

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
