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
  attachments,
  clients,
  comments,
  materials,
  tasks
} from "./reducer/generic"

const reducers = combineReducers({
  activities,
  attachments,
  auth,
  clients,
  comments,
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
