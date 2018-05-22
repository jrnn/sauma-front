import Error from "../component/alerts/error"
import MaterialContainer from "../container/material/material"
import MaterialsContainer from "../container/material/materials"
import PropTypes from "prop-types"
import React from "react"
import Spinner from "../component/widgets/spinner"
import { connect } from "react-redux"
import { fetchMaterialsIfNeeded } from "../action/material"
import { Route } from "react-router-dom"

class MaterialRoot extends React.Component {
  componentDidMount = () =>
    this.props.refresh(this.props.token)

  render = () => {
    let { error, match, pending } = this.props

    if ( pending ) return <Spinner />
    if ( error ) return <Error message={error} />

    return (
      <div>
        <h2 className="padded">Materiaalit</h2>
        <Route
          component={MaterialContainer}
          exact path={`${match.path}/:id`}
        />
        <Route
          exact path={match.path}
          component={MaterialsContainer}
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

MaterialRoot.propTypes = {
  error : PropTypes.string,
  match : PropTypes.object.isRequired,
  pending : PropTypes.bool.isRequired,
  refresh : PropTypes.func.isRequired,
  token : PropTypes.string.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MaterialRoot)
