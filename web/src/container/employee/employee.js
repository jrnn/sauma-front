import Accordion from "../../component/accordion"
import EmployeeDetailsContainer from "./employee_details"
import React from "react"
import { connect } from "react-redux"
import { resetWriteEmployee } from "../../action/employee"

class EmployeeContainer extends React.Component {
  componentWillUnmount = () =>
    this.props.reset()

  render = () => {
    let { employee, id, isNew } = this.props

    if ( !isNew && !employee ) return (
      <h1 align="center">
        Virheellinen ID! Älä sooloile osoitepalkin kanssa, capiche?
      </h1>
    )

    return (
      <div>
        <Accordion active={isNew} title="Perustiedot">
          <EmployeeDetailsContainer
            employee={employee || {}}
            id={id}
            isNew={isNew}
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

const mapStateToProps = (state, props) => {
  let { id } = props.match.params

  return {
    employee : state.employees.data.items
      .find(e => e.id === id),
    id,
    isNew : ( id === "new" )
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    reset : () => {
      dispatch(resetWriteEmployee())
    }
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeContainer)
