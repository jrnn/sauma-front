import ProjectDetailsContainer from "./project_details"
import ProjectListContaner from "./project_list"
import React from "react"
import Spinner from "../../component/spinner"
import { connect } from "react-redux"
import { fetchClientsIfNeeded } from "../../action/client"
import { fetchEmployeesIfNeeded } from "../../action/employee"
import { fetchProjectsIfNeeded } from "../../action/project"
import { fetchTasksIfNeeded } from "../../action/task"
import { Route } from "react-router-dom"

class ProjectContainer extends React.Component {
  componentDidMount = () =>
    this.props.refreshState(this.props.auth.token)

  render = () => {
    let { error, match, pending } = this.props

    if ( pending ) return (
      <Spinner />
    )

    if ( error ) return (
      <h1 align="center">{error}</h1>
    )

    return (
      <div>
        <h2 className="padded">Työmaat</h2>
        <Route
          exact path={`${match.path}/:id`}
          component={ProjectDetailsContainer}
        />
        <Route
          exact path={match.path}
          component={ProjectListContaner}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    auth : state.auth,
    error : state.projects.data.error,
    pending : state.projects.data.pending
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    refreshState : (token) => {
      dispatch(fetchClientsIfNeeded(token))
      dispatch(fetchEmployeesIfNeeded(token))
      dispatch(fetchProjectsIfNeeded(token))
      dispatch(fetchTasksIfNeeded(token))
    }
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectContainer)
