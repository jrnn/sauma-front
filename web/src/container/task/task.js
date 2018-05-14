import React from "react"
import Spinner from "../../component/spinner"
import TaskDetailsContainer from "./task_details"
import TaskListContainer from "./task_list"
import { connect } from "react-redux"
import { fetchActivitiesIfNeeded } from "../../action/activity"
import { fetchMaterialsIfNeeded } from "../../action/material"
import { fetchProjectsIfNeeded } from "../../action/project"
import { fetchTasksIfNeeded } from "../../action/task"
import { Route, withRouter } from "react-router-dom"

class TaskContainer extends React.Component {
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
        <h2 className="padded">Tehtävät</h2>
        <Route
          exact path={`${match.path}/:id`}
          component={TaskDetailsContainer}
        />
        <Route
          exact path={match.path}
          component={TaskListContainer}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    auth : state.auth,
    error : state.tasks.data.error,
    pending : state.tasks.data.pending
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    refreshState : (token) => {
      dispatch(fetchActivitiesIfNeeded(token))
      dispatch(fetchMaterialsIfNeeded(token))
      dispatch(fetchProjectsIfNeeded(token))
      dispatch(fetchTasksIfNeeded(token))
    }
  }
)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskContainer))
