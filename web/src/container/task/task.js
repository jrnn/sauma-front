import React from "react"
import Spinner from "../../component/spinner"
import TaskDetailsContainer from "./task_details"
import TaskListContainer from "./task_list"
import { connect } from "react-redux"
import { Route, withRouter } from "react-router-dom"

class TaskContainer extends React.Component {
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

export default withRouter(connect(
  mapStateToProps,
  null
)(TaskContainer))
