import Accordion from "../../component/accordion"
import MyFormContainer from "./my_form"
import MyPasswordContainer from "./my_password"
import React from "react"
import { changePassword, updateEmployee } from "../../action/employee"
import { connect } from "react-redux"

class MyDetailsContainer extends React.Component {
  changePassword = (passwords) => {
    let { id, token } = this.props.auth
    this.props.changePassword(id, passwords, token)
  }

  updateEmployee = (employee) => {
    let { id, token } = this.props.auth
    this.props.updateEmployee(id, employee, token)
  }

  render = () => {
    let { employee } = this.props

    return (
      <div>
        <Accordion active={true} title="Perustiedot">
          <MyFormContainer
            employee={employee || {}}
            onSubmit={this.updateEmployee}
          />
        </Accordion>
        <Accordion title="Salasanan vaihto">
          <MyPasswordContainer
            onSubmit={this.changePassword}
          />
        </Accordion>
        <Accordion title="Suoritteet">
          <p>TULOSSA PIAN</p>
        </Accordion>
        <Accordion title="<Placeholder>">
          <p>Jotain muuta vielä...?</p>
        </Accordion>
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    auth : state.auth,
    employee : state.employees.data.items
      .find(e => e.id === state.auth.id),
  }
)

export default connect(
  mapStateToProps,
  { changePassword, updateEmployee }
)(MyDetailsContainer)
