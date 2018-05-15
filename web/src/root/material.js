import MaterialContainer from "../container/material/material"
import MaterialListContainer from "../container/material/material_list"
import React from "react"
import Spinner from "../component/spinner"
import { connect } from "react-redux"
import { fetchMaterialsIfNeeded } from "../action/material"
import { Route } from "react-router-dom"

class MaterialRoot extends React.Component {
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
        <h2 className="padded">Materiaalit</h2>
        <Route
          component={MaterialContainer}
          exact path={`${match.path}/:id`}
        />
        <Route
          exact path={match.path}
          component={MaterialListContainer}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    error : state.materials.data.error,
    pending : state.materials.data.pending,
    token : state.auth.token
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    refresh : (token) => {
      dispatch(fetchMaterialsIfNeeded(token))
    }
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MaterialRoot)
