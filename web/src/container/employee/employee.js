import Accordion from "../../component/widgets/accordion"
import EmployeeDetailsContainer from "./employee_details"
import Error from "../../component/alerts/error"
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { resetWriteEmployee } from "../../action/employee"

class EmployeeContainer extends React.Component {
  componentWillUnmount = () =>
    this.props.reset()

  render = () => {
    let { employee, id, isNew } = this.props
    if ( !isNew && !employee ) return <Error />

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
            <Accordion title="Työmaat">
              <p>TULOSSA PIAN || employee.projects</p>
            </Accordion>
            <Accordion title="Suoritteet">
              <p>TULOSSA PIAN</p>
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

EmployeeContainer.propTypes = {
  employee : PropTypes.object,
  id : PropTypes.string.isRequired,
  isNew : PropTypes.bool.isRequired,
  reset : PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeContainer)
