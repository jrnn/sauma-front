import ClientDetailsContainer from "./client_details"
import ClientListContaner from "./client_list"
import React from "react"
import Spinner from "../../component/spinner"
import { connect } from "react-redux"
import { fetchClientsIfNeeded } from "../../action/client"
import { Route } from "react-router-dom"

class ClientContainer extends React.Component {
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
        <h2 className="padded">Asiakkaat</h2>
        <Route
          exact path={`${match.path}/:id`}
          component={ClientDetailsContainer}
        />
        <Route
          exact path={match.path}
          component={ClientListContaner}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    auth : state.auth,
    error : state.clients.data.error,
    pending : state.clients.data.pending
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    refreshState : (token) => {
      dispatch(fetchClientsIfNeeded(token))
    }
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientContainer)
