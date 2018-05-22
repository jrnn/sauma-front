import LinkButton from "../../component/widgets/link_button"
import ListContainer from "../list"
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { filterMaterials } from "../../component/lists/list_filters"
import { materialRow } from "../../component/lists/list_rows"

const MaterialsContainer = ({ admin, materials }) =>
  <div>
    <ListContainer
      entities={materials}
      filter={filterMaterials}
      toRow={materialRow}
    />
    <LinkButton
      active={admin}
      href="/materials/new"
      label="Lisää uusi materiaali"
    />
  </div>

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
