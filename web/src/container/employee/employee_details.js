import Accordion from "../../component/accordion"
import EmployeeFormContainer from "./employee_form"
import React from "react"
import { connect } from "react-redux"
import { createEmployee, updateEmployee } from "../../action/employee"
import { withRouter } from "react-router-dom"

class EmployeeDetailsContainer extends React.Component {
  save = (employee) => {
    let { id } = this.props.match.params
    let { auth, createEmployee, history, isNew, updateEmployee } = this.props

    if ( isNew )
      createEmployee(employee, auth.token, history)
    else
      updateEmployee(id, employee, auth.token)
  }

  render = () => {
    let { employee, isNew } = this.props

    if ( !isNew && !employee ) return (
      <h1 align="center">
        Virheellinen ID! Älä sooloile osoitepalkin kanssa, capiche?
      </h1>
    )

    return (
      <div>
        <Accordion active={isNew} title="Perustiedot">
          <EmployeeFormContainer
            employee={employee || {}}
            onSubmit={this.save}
          />
        </Accordion>
        {( isNew )
          ? null
          : <div>
            <Accordion title="Suoritteet">
              <p>TULOSSA PIAN</p>
            </Accordion>
            <Accordion title="<Placeholder>">
              <p>Jotain muuta vielä...?</p>
            </Accordion>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, props) => (
  {
    auth : state.auth,
    employee : state.employees.data.items
      .find(e => e.id === props.match.params.id),
    isNew : ( props.match.params.id === "new" )
  }
)

export default withRouter(connect(
  mapStateToProps,
  { createEmployee, updateEmployee }
)(EmployeeDetailsContainer))
