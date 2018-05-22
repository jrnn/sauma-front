import Accordion from "../../component/widgets/accordion"
import EmployeeDetailsContainer from "./employee_details"
import Error from "../../component/alerts/error"
import ProjectListContainer from "../project/project_list"
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { fetchProjectsIfNeeded } from "../../action/project"
import { resetWriteEmployee } from "../../action/employee"

class EmployeeContainer extends React.Component {
  componentDidMount = () =>
    this.props.refresh(this.props.token)

  componentWillUnmount = () =>
    this.props.reset()

  render = () => {
    let { employee, isNew } = this.props
    if ( !isNew && !employee ) return <Error />

    return (
      <div>
        <Accordion active={isNew} title="Perustiedot">
          <EmployeeDetailsContainer
            employee={employee || {}}
            id={this.props.id}
            isNew={isNew}
          />
        </Accordion>
        {( isNew )
          ? null
          : <div>
            <Accordion title="Työmaat">
              <ProjectListContainer
                projects={this.props.projects}
              />
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
    isNew : ( id === "new" ),
    projects : state.projects.data.items
      .filter(p => p.employees.includes(id)),
    token : state.auth.token
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    refresh : (token) => {
      dispatch(fetchProjectsIfNeeded(token))
    },
    reset : () => {
      dispatch(resetWriteEmployee())
    }
  }
)

EmployeeContainer.propTypes = {
  employee : PropTypes.object,
  id : PropTypes.string.isRequired,
  isNew : PropTypes.bool.isRequired,
  projects : PropTypes.arrayOf(PropTypes.object).isRequired,
  refresh : PropTypes.func.isRequired,
  reset : PropTypes.func.isRequired,
  token : PropTypes.string.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeContainer)
