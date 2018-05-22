import EmployeeListContainer from "./employee_list"
import LinkButton from "../../component/widgets/link_button"
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"

class EmployeesContainer extends React.Component {
  render = () =>
    <div>
      <EmployeeListContainer
        employees={this.props.employees}
      />
      <LinkButton
        active={this.props.admin}
        href="/employees/new"
        label="Lisää uusi"
      />
    </div>
}

const mapStateToProps = (state) => (
  {
    admin : state.auth.admin,
    employees : state.employees.data.items
  }
)

EmployeesContainer.propTypes = {
  admin : PropTypes.bool.isRequired,
  employees : PropTypes.arrayOf(PropTypes.object)
}

export default connect(
  mapStateToProps,
  null
)(EmployeesContainer)
