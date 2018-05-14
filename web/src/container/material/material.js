import MaterialDetailsContainer from "./material_details"
import MaterialListContaner from "./material_list"
import React from "react"
import Spinner from "../../component/spinner"
import { connect } from "react-redux"
import { fetchMaterialsIfNeeded } from "../../action/material"
import { Route, withRouter } from "react-router-dom"

class MaterialContainer extends React.Component {
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
        <h2 className="padded">Materiaalit</h2>
        <Route
          exact path={`${match.path}/:id`}
          component={MaterialDetailsContainer}
        />
        <Route
          exact path={match.path}
          component={MaterialListContaner}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    auth : state.auth,
    error : state.materials.data.error,
    pending : state.materials.data.pending
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    refreshState : (token) => {
      dispatch(fetchMaterialsIfNeeded(token))
    }
  }
)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MaterialContainer))
