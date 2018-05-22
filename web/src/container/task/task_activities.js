import ActivityListContainer from "../activity/activity_list"
import LinkButton from "../../component/widgets/link_button"
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"

class TaskActivitiesContainer extends React.Component {
  render = () =>
    <div>
      <ActivityListContainer
        activities={this.props.activities}
      />
      <LinkButton
        active={( this.props.isOwner && !this.props.task.completed )}
        href={`/activities/new?id=${this.props.task.id}`}
        label="Lisää uusi"
      />
    </div>
}

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
