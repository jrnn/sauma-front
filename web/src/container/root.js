import ActivityContainer from "./activity/activity"
import ClientContainer from "./client/client"
import EmployeeContainer from "./employee/employee"
import MaterialContainer from "./material/material"
import MyContainer from "./my/my"
import ProjectContainer from "./project/project"
import React from "react"
import TaskContainer from "./task/task"
import { connect } from "react-redux"
import { Redirect, Route, Switch } from "react-router-dom"
import { withRouter } from "react-router-dom"

class RootContainer extends React.Component {
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
          path="/projects"
          component={ProjectContainer}
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

const mapStateToProps = (state) =>
  ({ auth : state.auth })

export default withRouter(connect(
  mapStateToProps,
  null
)(RootContainer))
