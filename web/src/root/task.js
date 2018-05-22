import Error from "../component/alerts/error"
import PropTypes from "prop-types"
import React from "react"
import Spinner from "../component/widgets/spinner"
import TaskContainer from "../container/task/task"
import TasksContainer from "../container/task/tasks"
import { connect } from "react-redux"
import { fetchTasksIfNeeded } from "../action/task"
import { Route } from "react-router-dom"

class TaskRoot extends React.Component {
  componentDidMount = () =>
    this.props.refresh(this.props.token)

  render = () => {
    let { error, match, pending } = this.props

    if ( pending ) return <Spinner />
    if ( error ) return <Error message={error} />

    return (
      <div>
        <h2 className="padded">Tehtävät</h2>
        <Route
          component={TaskContainer}
          exact path={`${match.path}/:id`}
        />
        <Route
          component={TasksContainer}
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

TaskRoot.propTypes = {
  error : PropTypes.string,
  match : PropTypes.object.isRequired,
  pending : PropTypes.bool.isRequired,
  refresh : PropTypes.func.isRequired,
  token : PropTypes.string.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskRoot)
