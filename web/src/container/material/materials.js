import LinkButton from "../../component/widgets/link_button"
import MaterialListContainer from "./material_list"
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"

class MaterialsContainer extends React.Component {
  render = () =>
    <div>
      <MaterialListContainer
        materials={this.props.materials}
      />
      <LinkButton
        active={this.props.admin}
        href="/materials/new"
        label="Lisää uusi"
      />
    </div>
}

const mapStateToProps = (state) => (
  {
    admin : state.auth.admin,
    materials : state.materials.data.items
  }
)

MaterialsContainer.propTypes = {
  admin : PropTypes.bool.isRequired,
  materials : PropTypes.arrayOf(PropTypes.object)
}

export default connect(
  mapStateToProps,
  null
)(MaterialsContainer)
