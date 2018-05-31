import Accordion from "../../component/widgets/accordion"
import EmployeeFormContainer from "./employee_form"
import Error from "../../component/alerts/error"
import ListContainer from "../list"
import PropTypes from "prop-types"
import React from "react"
import {
  activityRowForEmployee,
  projectRow
} from "../../component/lists/list_rows"
import { connect } from "react-redux"
import { fetchActivitiesIfNeeded } from "../../action/activity"
import { fetchProjectsIfNeeded } from "../../action/project"
import {
  filterActivitiesForEmployee,
  filterProjects
} from "../../component/lists/list_filters"
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
        <Accordion
          active={isNew}
          title="Perustiedot"
        >
          <EmployeeFormContainer
            employee={employee || {}}
            id={this.props.id}
            isNew={isNew}
          />
        </Accordion>
        {( isNew )
          ? null
          : <div>
            <Accordion
              active={( employee.projects.length > 0 )}
              title="Työmaat"
            >
              <ListContainer
                entities={this.props.projects}
                filter={filterProjects}
                toRow={projectRow}
              />
            </Accordion>
            <Accordion
              active={( this.props.activities.length > 0 )}
              title="Suoritteet"
            >
              <ListContainer
                entities={this.props.activities}
                filter={filterActivitiesForEmployee}
                toRow={activityRowForEmployee}
              />
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
    activities : state.activities.data.items
      .filter(a => a.owner.id === id),
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
      dispatch(fetchActivitiesIfNeeded(token))
      dispatch(fetchProjectsIfNeeded(token))
    },
    reset : () => {
      dispatch(resetWriteEmployee())
    }
  }
)

EmployeeContainer.propTypes = {
  activities : PropTypes.arrayOf(PropTypes.object).isRequired,
  employee : PropTypes.object,
  id : PropTypes.string.isRequired,
  isNew : PropTypes.bool.isRequired,
  match : PropTypes.object.isRequired,
  projects : PropTypes.arrayOf(PropTypes.object).isRequired,
  refresh : PropTypes.func.isRequired,
  reset : PropTypes.func.isRequired,
  token : PropTypes.string.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeContainer)
