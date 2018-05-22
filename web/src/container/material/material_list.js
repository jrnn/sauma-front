import MaterialList from "../../component/lists/material_list"
import PropTypes from "prop-types"
import React from "react"
import SearchField from "../../component/widgets/search_field"

class MaterialListContainer extends React.Component {
  constructor() {
    super()
    this.state = { filter : "" }
  }

  filterMaterials = () => {
    let { filter } = this.state

    return this.props.materials
      .filter(m => m.name.toLowerCase().includes(filter))
      .sort((m1, m2) =>
        m1.name.localeCompare(m2.name))
  }

  handleFilter = (e, { value }) =>
    this.setState({ filter : value.toLowerCase() })

  render = () =>
    <div>
      <SearchField
        onChange={this.handleFilter}
        value={this.state.filter}
      />
      <MaterialList
        materials={this.filterMaterials()}
      />
    </div>
}

MaterialListContainer.propTypes = {
  materials : PropTypes.arrayOf(PropTypes.object)
}

export default MaterialListContainer
