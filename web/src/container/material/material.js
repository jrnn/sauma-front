import Accordion from "../../component/widgets/accordion"
import AttachmentContainer from "../attachment/attachment"
import Error from "../../component/alerts/error"
import MaterialDetailsContainer from "./material_details"
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { resetWriteMaterial, updateMaterial } from "../../action/material"

class MaterialContainer extends React.Component {
  componentWillUnmount = () =>
    this.props.reset()

  render = () => {
    let { id, isNew, material } = this.props
    if ( !isNew && !material ) return <Error />

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
            <Accordion title="Liitteet">
              <AttachmentContainer
                attachments={material.attachments || []}
                entity="Material"
                id={id}
                thunk={updateMaterial}
              />
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

MaterialContainer.propTypes = {
  id : PropTypes.string.isRequired,
  isNew : PropTypes.bool.isRequired,
  match : PropTypes.object.isRequired,
  material : PropTypes.object,
  reset : PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MaterialContainer)
