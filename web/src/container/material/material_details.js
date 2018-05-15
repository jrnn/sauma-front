import MaterialFormContainer from "./material_form"
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

    if ( isNew )
      this.props.createMaterial(payload, token, history)
    else
      this.props.updateMaterial(id, payload, token)
  }

  render = () => {
    return (
      <MaterialFormContainer
        material={this.props.material}
        onSubmit={this.save}
      />
    )
  }
}

const mapStateToProps = (state) =>
  ({ token : state.auth.token })

export default withRouter(connect(
  mapStateToProps,
  { createMaterial, updateMaterial }
)(MaterialDetailsContainer))
