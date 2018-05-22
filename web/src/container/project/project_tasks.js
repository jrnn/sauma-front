import LinkButton from "../../component/widgets/link_button"
import ListContainer from "../list"
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { filterTasks } from "../../component/lists/list_filters"
import { taskRow } from "../../component/lists/list_rows"

const ProjectTasksContainer = ({ admin, id, tasks }) =>
  <div>
    <ListContainer
      entities={tasks}
      filter={filterTasks}
      toRow={taskRow}
    />
    <LinkButton
      active={admin}
      href={`/tasks/new?id=${id}`}
      label="Lisää uusi tehtävä"
    />
  </div>

const mapStateToProps = (state, props) => (
  {
    admin : state.auth.admin,
    tasks : state.tasks.data.items
      .filter(t => t.project.id === props.id)
  }
)

ProjectTasksContainer.propTypes = {
  admin : PropTypes.bool.isRequired,
  id : PropTypes.string.isRequired,
  tasks : PropTypes.arrayOf(PropTypes.object).isRequired
}

export default connect(
  mapStateToProps,
  null
)(ProjectTasksContainer)
