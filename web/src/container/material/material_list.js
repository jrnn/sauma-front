import MaterialList from "../../component/material_list"
import React from "react"
import { connect } from "react-redux"

class MaterialListContainer extends React.Component {
  constructor() {
    super()
    this.state = { filter : "" }
  }

  filterMaterials = () => {
    let { filter } = this.state
    let { materials } = this.props

    return materials
      .filter(m => m.name.toLowerCase().includes(filter))
      .sort((m1, m2) =>
        m1.name.localeCompare(m2.name))
  }

  handleFilter = (e, { value }) =>
    this.setState({ filter : value.toLowerCase() })

  render = () => {
    return (
      <MaterialList
        admin={this.props.auth.admin}
        filter={this.state.filter}
        materials={this.filterMaterials()}
        onChange={this.handleFilter}
      />
    )
  }
}

const mapStateToProps = (state) => (
  {
    auth : state.auth,
    materials : state.materials.data.items
  }
)

export default connect(
  mapStateToProps,
  null
)(MaterialListContainer)
