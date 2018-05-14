import ActivityContainer from "../container/activity/activity"
import ClientContainer from "../container/client/client"
import EmployeeContainer from "../container/employee/employee"
import MaterialContainer from "../container/material/material"
import MyContainer from "../container/my/my"

import ProjectRoot from "./project"
import React from "react"
import TaskContainer from "../container/task/task"
import { Redirect, Route, Switch } from "react-router-dom"
import { withRouter } from "react-router-dom"

class Root extends React.Component {
  render = () => {
    return (
      <Switch>
        <Route
          path="/activities"
          component={ActivityContainer}
        />
        <Route
          path="/clients"
          component={ClientContainer}
        />
        <Route
          path="/employees"
          component={EmployeeContainer}
        />
        <Route
          path="/materials"
          component={MaterialContainer}
        />
        <Route
          path="/my"
          component={MyContainer}
        />
        <Route
          component={ProjectRoot}
          path="/projects"
        />
        <Route
          path="/tasks"
          component={TaskContainer}
        />
        <Redirect to="/" />
      </Switch>
    )
  }
}

export default withRouter(Root)
