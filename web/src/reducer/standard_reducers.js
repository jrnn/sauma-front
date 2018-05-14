import { combineReducers } from "redux"
import { standardDataReducer, standardWriteReducer } from "./generic"
import { types as activity } from "../action/activity"
import { types as client } from "../action/client"
import { types as material } from "../action/material"
import { types as task } from "../action/task"

export const activities = combineReducers({
  data : standardDataReducer(activity),
  write : standardWriteReducer(activity)
})

export const clients = combineReducers({
  data : standardDataReducer(client),
  write : standardWriteReducer(client)
})

export const materials = combineReducers({
  data : standardDataReducer(material),
  write : standardWriteReducer(material)
})

export const tasks = combineReducers({
  data : standardDataReducer(task),
  write : standardWriteReducer(task)
})
