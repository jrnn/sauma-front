import ActivityRoot from "./activity"
import ClientRoot from "./client"
import EmployeeRoot from "./employee"
import MaterialRoot from "./material"
import MyRoot from "./my"
import ProjectRoot from "./project"
import React from "react"
import TaskRoot from "./task"
import { Redirect, Route, Switch } from "react-router-dom"
import { withRouter } from "react-router-dom"

const Root = () =>
  <Switch>
    <Route
      component={ActivityRoot}
      path="/activities"
    />
    <Route
      component={ClientRoot}
      path="/clients"
    />
    <Route
      component={EmployeeRoot}
      path="/employees"
    />
    <Route
      component={MaterialRoot}
      path="/materials"
    />
    <Route
      component={MyRoot}
      path="/my"
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

export default withRouter(Root)
