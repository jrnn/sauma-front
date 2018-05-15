import ClientContainer from "../container/client/client"
import ClientListContaner from "../container/client/client_list"
import React from "react"
import Spinner from "../component/spinner"
import { connect } from "react-redux"
import { fetchClientsIfNeeded } from "../action/client"
import { Route } from "react-router-dom"

class ClientRoot extends React.Component {
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
        <h2 className="padded">Asiakkaat</h2>
        <Route
          component={ClientContainer}
          exact path={`${match.path}/:id`}
        />
        <Route
          component={ClientListContaner}
          exact path={match.path}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    error : state.clients.data.error,
    pending : state.clients.data.pending,
    token : state.auth.token
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    refresh : (token) => {
      dispatch(fetchClientsIfNeeded(token))
    }
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientRoot)
