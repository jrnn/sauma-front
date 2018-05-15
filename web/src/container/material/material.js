import Accordion from "../../component/accordion"
import MaterialDetailsContainer from "./material_details"
import React from "react"
import { connect } from "react-redux"
import { resetWriteMaterial } from "../../action/material"

class MaterialContainer extends React.Component {
  componentWillUnmount = () =>
    this.props.reset()

  render = () => {
    let { id, isNew, material } = this.props

    if ( !isNew && !material ) return (
      <h1 align="center">
        Virheellinen ID! Älä sooloile osoitepalkin kanssa, capiche?
      </h1>
    )

    return (
      <div>
        <Accordion active={isNew} title="Perustiedot">
          <MaterialDetailsContainer
            id={id}
            isNew={isNew}
            material={material || {}}
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

const mapStateToProps = (state, props) => {
  let { id } = props.match.params

  return {
    id,
    isNew : ( id === "new" ),
    material : state.materials.data.items
      .find(m => m.id === id)
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    reset : () => {
      dispatch(resetWriteMaterial())
    }
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MaterialContainer)
