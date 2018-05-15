import ActivityRoot from "./activity"

import ClientContainer from "../container/client/client"
import EmployeeContainer from "../container/employee/employee"
import MaterialContainer from "../container/material/material"
import MyContainer from "../container/my/my"

import ProjectRoot from "./project"
import React from "react"
import TaskRoot from "./task"
import { Redirect, Route, Switch } from "react-router-dom"
import { withRouter } from "react-router-dom"

class Root extends React.Component {
  render = () => {
    return (
      <Switch>
        <Route
          component={ActivityRoot}
          path="/activities"
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
          component={TaskRoot}
          path="/tasks"
        />
        <Redirect to="/" />
      </Switch>
    )
  }
}

export default withRouter(Root)
