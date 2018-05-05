import React from "react"
import TaskList from "../../component/task_list"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

class TaskListContainer extends React.Component {
  constructor() {
    super()
    this.state = { filter : "" }
  }

  filterTasks = () => {
    let { filter } = this.state

    return this.props.tasks
      .filter(t =>
        t.project.projectId.toLowerCase().includes(filter) ||
        t.description.toLowerCase().includes(filter))
      .sort((t1, t2) => {
        let a = `${t1.project.projectId}_${t1.description}`
        let b = `${t2.project.projectId}_${t2.description}`
        return a.localeCompare(b)
      })
  }

  handleFilter = (e, { value }) =>
    this.setState({ filter : value.toLowerCase() })

  render = () => {
    return (
      <TaskList
        filter={this.state.filter}
        onChange={this.handleFilter}
        tasks={this.filterTasks()}
      />
    )
  }
}

const mapStateToProps = (state) => (
  {
    auth : state.auth,
    tasks : state.tasks.data.items
  }
)

export default withRouter(connect(
  mapStateToProps,
  null
)(TaskListContainer))
