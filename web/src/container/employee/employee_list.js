import EmployeeList from "../../component/lists/employee_list"
import PropTypes from "prop-types"
import React from "react"
import SearchField from "../../component/widgets/search_field"

class EmployeeListContainer extends React.Component {
  constructor() {
    super()
    this.state = { filter : "" }
  }

  filterEmployees = () => {
    let { filter } = this.state

    return this.props.employees
      .filter(e =>
        `${e.lastName}, ${e.firstName}`
          .toLowerCase().includes(filter))
      .sort((e1, e2) =>
        e1.lastName.localeCompare(e2.lastName))
  }

  handleFilter = (e, { value }) =>
    this.setState({ filter : value.toLowerCase() })

  render = () =>
    <div>
      <SearchField
        onChange={this.handleFilter}
        value={this.state.filter}
      />
      <EmployeeList
        employees={this.filterEmployees()}
      />
    </div>
}

EmployeeListContainer.propTypes = {
  employees : PropTypes.arrayOf(PropTypes.object)
}

export default EmployeeListContainer
