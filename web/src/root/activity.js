import ActivityContainer from "../container/activity/activity"
import React from "react"
import Spinner from "../component/spinner"
import { connect } from "react-redux"
import { fetchActivitiesIfNeeded } from "../action/activity"
import { Route } from "react-router-dom"

class ActivityRoot extends React.Component {
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
        <h2 className="padded">Suoritteet</h2>
        <Route
          component={ActivityContainer}
          exact path={`${match.path}/:id`}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    error : state.activities.data.error,
    pending : state.activities.data.pending,
    token : state.auth.token
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    refresh : (token) => {
      dispatch(fetchActivitiesIfNeeded(token))
    }
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityRoot)
