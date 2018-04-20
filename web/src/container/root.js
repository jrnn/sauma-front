import ClientContainer from "./client/client"
import EmployeeContainer from "./employee/employee"
import ProjectContainer from "./project/project"
import React from "react"
import { connect } from "react-redux"
import { fetchClients, resetClients } from "../action/client"
import { fetchEmployees, resetEmployees } from "../action/employee"
import { fetchProjects, resetProjects } from "../action/project"
import { Redirect, Route, Switch } from "react-router-dom"
import { withRouter } from "react-router-dom"

class RootContainer extends React.Component {
  componentDidMount = () =>
    this.props.initState(this.props.auth.token)

  componentWillUnMount = () =>
    this.props.resetState()

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
          path="/projects"
          component={ProjectContainer}
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
      dispatch(fetchProjects(token))
    },
    resetState : () => {
      dispatch(resetClients())
      dispatch(resetEmployees())
      dispatch(resetProjects())
    }
  }
)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(RootContainer))
