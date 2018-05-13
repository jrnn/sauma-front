import Accordion from "../../component/accordion"
import MaterialFormContainer from "./material_form"
import React from "react"
import { connect } from "react-redux"
import { createMaterial, updateMaterial } from "../../action/material"
import { withRouter } from "react-router-dom"

class MaterialDetailsContainer extends React.Component {
  save = (material) => {
    let { id } = this.props.match.params
    let { auth, createMaterial, history, isNew, updateMaterial } = this.props

    material.unitCost = Number(material.unitCost.replace(/,/g, "."))

    if ( isNew )
      createMaterial(material, auth.token, history)
    else
      updateMaterial(id, material, auth.token)
  }

  render = () => {
    let { material, isNew } = this.props

    if ( !isNew && !material ) return (
      <h1 align="center">
        Virheellinen ID! Älä sooloile osoitepalkin kanssa, capiche?
      </h1>
    )

    return (
      <div>
        <Accordion active={isNew} title="Perustiedot">
          <MaterialFormContainer
            material={material || {}}
            onSubmit={this.save}
          />
        </Accordion>
        {( isNew )
          ? null
          : <div>
            <Accordion title="<Placeholder>">
              <p>Jotain muuta vielä...?</p>
            </Accordion>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, props) => (
  {
    auth : state.auth,
    isNew : ( props.match.params.id === "new" ),
    material : state.materials.data.items
      .find(m => m.id === props.match.params.id)
  }
)

export default withRouter(connect(
  mapStateToProps,
  { createMaterial, updateMaterial }
)(MaterialDetailsContainer))
