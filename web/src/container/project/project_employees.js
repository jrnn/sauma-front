import Assigner from "../../component/widgets/assigner"
import ListContainer from "../list"
import PropTypes from "prop-types"
import React from "react"
import { assignEmployeeToProject, unassignEmployeeFromProject } from "../../action/project"
import { connect } from "react-redux"
import { employeeRow, employeeRowForProject } from "../../component/lists/list_rows"
import { filterEmployees } from "../../component/lists/list_filters"
import { unassignedOptions } from "../../util/form_options"

class ProjectEmployeesContainer extends React.Component {
  constructor() {
    super()
    this.state = { id : "" }
  }

  assign = (e) => {
    e.preventDefault()
    const { assignEmployeeToProject, auth, id } = this.props
    assignEmployeeToProject(id, this.state, auth.token)
  }

  unassign = (e, { name }) => {
    e.preventDefault()
    const { auth, id, unassignEmployeeFromProject } = this.props
    unassignEmployeeFromProject(id, name, auth.token)
  }

  handleChange = (e, { value }) =>
    this.setState({ id : value })

  render = () => {
    const { auth, employees, project } = this.props

    return (
      <div>
        <ListContainer
          entities={employees
            .filter(e => project.employees.includes(e.id))
          }
          filter={filterEmployees}
          toRow={( !auth.admin )
            ? employeeRow
            : employeeRowForProject(this.unassign)
          }
        />
        <Assigner
          active={this.props.auth.admin}
          button="Osoita"
          label="Osoita työntekijä työmaalle"
          onChange={this.handleChange}
          onSubmit={this.assign}
          options={unassignedOptions(employees, project)}
          placeholder="Valitse työntekijä"
          selected={this.state.id}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    auth : state.auth,
    employees : state.employees.data.items
  }
)

ProjectEmployeesContainer.propTypes = {
  assignEmployeeToProject : PropTypes.func.isRequired,
  auth : PropTypes.object.isRequired,
  id : PropTypes.string.isRequired,
  employees : PropTypes.arrayOf(PropTypes.object).isRequired,
  project : PropTypes.object.isRequired,
  unassignEmployeeFromProject : PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  { assignEmployeeToProject, unassignEmployeeFromProject }
)(ProjectEmployeesContainer)
