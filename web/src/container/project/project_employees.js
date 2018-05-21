import ProjectEmployees from "../../component/lists/project_employees"
import PropTypes from "prop-types"
import React from "react"
import { assignEmployeeToProject } from "../../action/project"
import { connect } from "react-redux"
import { unassignedOptions } from "../../util/form_options"

class ProjectEmployeesContainer extends React.Component {
  constructor() {
    super()
    this.state = { id : null }
  }

  assign = (e) => {
    e.preventDefault()

    let { assignEmployeeToProject, auth, id } = this.props
    assignEmployeeToProject(id, this.state, auth.token)
  }

  handleChange = (e, { value }) =>
    this.setState({ id : value })

  render = () => {
    let { auth, employees, project } = this.props

    return (
      <ProjectEmployees
        assigned={project.employees}
        onChange={this.handleChange}
        onSubmit={this.assign}
        readOnly={( !auth.admin )}
        selected={this.state.id}
        unassigned={unassignedOptions(employees, project)}
      />
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
  project : PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  { assignEmployeeToProject }
)(ProjectEmployeesContainer)
