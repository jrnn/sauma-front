import ActivityDetailsContainer from "./activity_details"
import React from "react"
import Spinner from "../../component/spinner"
import { connect } from "react-redux"
import { fetchActivitiesIfNeeded } from "../../action/activity"
import { fetchMaterialsIfNeeded } from "../../action/material"
import { fetchTasksIfNeeded } from "../../action/task"
import { Route } from "react-router-dom"

class ActivityContainer extends React.Component {
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
        <h2 className="padded">Suoritteet</h2>
        <Route
          exact path={`${match.path}/:id`}
          component={ActivityDetailsContainer}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    auth : state.auth,
    error : state.activities.data.error,
    pending : state.activities.data.pending
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    refreshState : (token) => {
      dispatch(fetchActivitiesIfNeeded(token))
      dispatch(fetchMaterialsIfNeeded(token))
      dispatch(fetchTasksIfNeeded(token))
    }
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityContainer)
