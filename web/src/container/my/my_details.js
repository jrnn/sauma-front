import Accordion from "../../component/accordion"
import MyFormContainer from "./my_form"
import MyPasswordContainer from "./my_password"
import React from "react"
import Spinner from "../../component/spinner"
import { changePassword, updateEmployee } from "../../action/employee"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

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
    let { employee, error, pending } = this.props

    if ( pending ) return (
      <Spinner />
    )

    if ( error ) return (
      <h1 align="center">{error}</h1>
    )

    return (
      <div>
        <h2 className="padded">Omat tietoni</h2>
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
    error : state.employees.data.error,
    pending : state.employees.data.pending
  }
)

export default withRouter(connect(
  mapStateToProps,
  { changePassword, updateEmployee }
)(MyDetailsContainer))
