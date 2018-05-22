import ActivityContainer from "../container/activity/activity"
import Error from "../component/alerts/error"
import PropTypes from "prop-types"
import React from "react"
import Spinner from "../component/widgets/spinner"
import { connect } from "react-redux"
import { fetchActivitiesIfNeeded } from "../action/activity"
import { Route } from "react-router-dom"

class ActivityRoot extends React.Component {
  componentDidMount = () =>
    this.props.refresh(this.props.token)

  render = () => {
    let { error, match, pending } = this.props

    if ( pending ) return <Spinner />
    if ( error ) return <Error message={error} />

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

ActivityRoot.propTypes = {
  error : PropTypes.string,
  match : PropTypes.object.isRequired,
  pending : PropTypes.bool.isRequired,
  refresh : PropTypes.func.isRequired,
  token : PropTypes.string.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityRoot)
