import ProjectList from "../../component/project_list"
import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

class ProjectListContainer extends React.Component {
  constructor() {
    super()
    this.state = { filter : "" }
  }

  filterProjects = () => {
    let { filter } = this.state

    return this.props.projects
      .filter(p =>
        p.projectId.toLowerCase().includes(filter) ||
        p.client.legalEntity.toLowerCase().includes(filter))
      .sort((p1, p2) =>
        p1.projectId.localeCompare(p2.projectId))
  }

  handleFilter = (e, { value }) =>
    this.setState({ filter : value.toLowerCase() })

  render = () => {
    return (
      <ProjectList
        admin={this.props.auth.admin}
        filter={this.state.filter}
        onChange={this.handleFilter}
        projects={this.filterProjects()}
      />
    )
  }
}

const mapStateToProps = (state) => (
  {
    auth : state.auth,
    projects : state.projects.data.items
  }
)

export default withRouter(connect(
  mapStateToProps,
  null
)(ProjectListContainer))
