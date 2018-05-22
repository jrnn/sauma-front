import ListContainer from "../list"
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { filterTasks } from "../../component/lists/list_filters"
import { taskRow } from "../../component/lists/list_rows"

const TasksContainer = ({ tasks }) =>
  <ListContainer
    entities={tasks}
    filter={filterTasks}
    toRow={taskRow}
  />

const mapStateToProps = (state) =>
  ({ tasks : state.tasks.data.items })

TasksContainer.propTypes = {
  tasks : PropTypes.arrayOf(PropTypes.object)
}

export default connect(
  mapStateToProps,
  null
)(TasksContainer)
