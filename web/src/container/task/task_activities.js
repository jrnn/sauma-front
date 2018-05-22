import LinkButton from "../../component/widgets/link_button"
import ListContainer from "../list"
import PropTypes from "prop-types"
import React from "react"
import { activityRow } from "../../component/lists/list_rows"
import { connect } from "react-redux"
import { filterActivities } from "../../component/lists/list_filters"

const TaskActivitiesContainer = ({ activities, isOwner, task }) =>
  <div>
    <ListContainer
      entities={activities}
      filter={filterActivities}
      toRow={activityRow}
    />
    <LinkButton
      active={( isOwner && !task.completed )}
      href={`/activities/new?id=${task.id}`}
      label="Lisää uusi suorite"
    />
  </div>

const mapStateToProps = (state, props) => {
  let { employees } = props.task.project || []

  return {
    activities : state.activities.data.items
      .filter(a => a.task.id === props.id),
    isOwner : ( employees.includes(state.auth.id) )
  }
}

TaskActivitiesContainer.propTypes = {
  activities : PropTypes.arrayOf(PropTypes.object).isRequired,
  isOwner : PropTypes.bool.isRequired,
  task : PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  null
)(TaskActivitiesContainer)
