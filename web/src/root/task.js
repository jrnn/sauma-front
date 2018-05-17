import React from "react"
import Spinner from "../component/widgets/spinner"
import TaskContainer from "../container/task/task"
import TaskListContainer from "../container/task/task_list"
import { connect } from "react-redux"
import { fetchTasksIfNeeded } from "../action/task"
import { Route } from "react-router-dom"

class TaskRoot extends React.Component {
  componentDidMount = () =>
    this.props.refresh(this.props.token)

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
          component={TaskContainer}
          exact path={`${match.path}/:id`}
        />
        <Route
          component={TaskListContainer}
          exact path={match.path}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    error : state.tasks.data.error,
    pending : state.tasks.data.pending,
    token : state.auth.token
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    refresh : (token) => {
      dispatch(fetchTasksIfNeeded(token))
    }
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskRoot)
