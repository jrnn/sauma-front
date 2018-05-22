import ClientContainer from "../container/client/client"
import ClientsContainer from "../container/client/clients"
import Error from "../component/alerts/error"
import PropTypes from "prop-types"
import React from "react"
import Spinner from "../component/widgets/spinner"
import { connect } from "react-redux"
import { fetchClientsIfNeeded } from "../action/client"
import { Route } from "react-router-dom"

class ClientRoot extends React.Component {
  componentDidMount = () =>
    this.props.refresh(this.props.token)

  render = () => {
    let { error, match, pending } = this.props

    if ( pending ) return <Spinner />
    if ( error ) return <Error message={error} />

    return (
      <div>
        <h2 className="padded">Asiakkaat</h2>
        <Route
          component={ClientContainer}
          exact path={`${match.path}/:id`}
        />
        <Route
          component={ClientsContainer}
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

ClientRoot.propTypes = {
  error : PropTypes.string,
  match : PropTypes.object.isRequired,
  pending : PropTypes.bool.isRequired,
  refresh : PropTypes.func.isRequired,
  token : PropTypes.string.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientRoot)
