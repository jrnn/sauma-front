import ClientContainer from "./client/client"
import EmployeeContainer from "./employee/employee"
import MaterialContainer from "./material/material"
import ProjectContainer from "./project/project"
import React from "react"
import TaskContainer from "./task/task"
import { connect } from "react-redux"
import { fetchClients, fetchClientsIfNeeded } from "../action/client"
import { fetchEmployees, fetchEmployeesIfNeeded } from "../action/employee"
import { fetchMaterials, fetchMaterialsIfNeeded } from "../action/material"
import { fetchProjects, fetchProjectsIfNeeded } from "../action/project"
import { fetchTasks, fetchTasksIfNeeded } from "../action/task"
import { Redirect, Route, Switch } from "react-router-dom"
import { withRouter } from "react-router-dom"

class RootContainer extends React.Component {
  componentDidMount = () =>
    this.props.initState(this.props.auth.token)

  componentDidUpdate = () =>
    this.props.refreshState(this.props.auth.token)

  render = () => {
    return (
      <Switch>
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

const mapDispatchToProps = (dispatch) => (
  {
    initState : (token) => {
      dispatch(fetchClients(token))
      dispatch(fetchEmployees(token))
      dispatch(fetchMaterials(token))
      dispatch(fetchProjects(token))
      dispatch(fetchTasks(token))
    },
    refreshState : (token) => {
      dispatch(fetchClientsIfNeeded(token))
      dispatch(fetchEmployeesIfNeeded(token))
      dispatch(fetchMaterialsIfNeeded(token))
      dispatch(fetchProjectsIfNeeded(token))
      dispatch(fetchTasksIfNeeded(token))
    }
  }
)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(RootContainer))
