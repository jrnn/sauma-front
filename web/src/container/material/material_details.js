import MaterialFormContainer from "./material_form"
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { createMaterial, updateMaterial } from "../../action/material"
import { parseNumber } from "../../util/parser"
import { withRouter } from "react-router-dom"

class MaterialDetailsContainer extends React.Component {
  save = (material) => {
    let { history, id, isNew, token } = this.props
    let payload = {
      ...material,
      unitCost : parseNumber(material.unitCost)
    }

    return ( isNew )
      ? this.props.createMaterial(payload, token, history)
      : this.props.updateMaterial(id, payload, token)
  }

  render = () =>
    <MaterialFormContainer
      material={this.props.material}
      onSubmit={this.save}
    />
}

const mapStateToProps = (state) =>
  ({ token : state.auth.token })

MaterialDetailsContainer.propTypes = {
  createMaterial : PropTypes.func.isRequired,
  history : PropTypes.object.isRequired,
  id : PropTypes.string.isRequired,
  isNew : PropTypes.bool.isRequired,
  material : PropTypes.object.isRequired,
  token : PropTypes.string.isRequired,
  updateMaterial : PropTypes.func.isRequired
}

export default withRouter(connect(
  mapStateToProps,
  { createMaterial, updateMaterial }
)(MaterialDetailsContainer))
