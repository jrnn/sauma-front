import CommonList from "../component/lists/list"
import PropTypes from "prop-types"
import React from "react"
import SearchField from "../component/widgets/search_field"

class ListContainer extends React.Component {
  constructor() {
    super()
    this.state = { filter : "" }
  }

  handleChange = (e, { value }) =>
    this.setState({ filter : value.toLowerCase() })

  render = () =>
    <div>
      <SearchField
        onChange={this.handleChange}
        value={this.state.filter}
      />
      <CommonList
        entities={this.props.filter(
          this.props.entities,
          this.state.filter
        )}
        toRow={this.props.toRow}
      />
    </div>
}

ListContainer.propTypes = {
  entities : PropTypes.arrayOf(PropTypes.object).isRequired,
  filter : PropTypes.func.isRequired,
  toRow : PropTypes.func.isRequired
}

export default ListContainer
