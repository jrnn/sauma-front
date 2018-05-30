import { combineReducers } from "redux"
import {
  standardDataReducer,
  standardMinimalReducer,
  standardWriteReducer
} from "./standard_reducers"
import { types as activity } from "../action/activity"
import { types as attachment } from "../action/attachment"
import { types as client } from "../action/client"
import { types as comment } from "../action/comment"
import { types as material } from "../action/material"
import { types as task } from "../action/task"

export const activities = combineReducers({
  data : standardDataReducer(activity),
  write : standardWriteReducer(activity)
})

export const attachments = standardMinimalReducer(attachment)

export const clients = combineReducers({
  data : standardDataReducer(client),
  write : standardWriteReducer(client)
})

export const comments = standardMinimalReducer(comment)

export const materials = combineReducers({
  data : standardDataReducer(material),
  write : standardWriteReducer(material)
})

export const tasks = combineReducers({
  data : standardDataReducer(task),
  write : standardWriteReducer(task)
})
