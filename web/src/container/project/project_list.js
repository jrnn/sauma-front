import ProjectList from "../../component/lists/project_list"
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"

class ProjectListContainer extends React.Component {
  constructor() {
    super()
    this.state = { filter : "" }
  }

  filterProjects = () => {
    let { filter } = this.state

    return this.props.projects
      .filter(p =>
        p.name.toLowerCase().includes(filter) ||
        p.projectId.toLowerCase().includes(filter) ||
        p.client.legalEntity.toLowerCase().includes(filter))
      .sort((p1, p2) =>
        p1.projectId.localeCompare(p2.projectId))
  }

  handleFilter = (e, { value }) =>
    this.setState({ filter : value.toLowerCase() })

  render = () =>
    <ProjectList
      admin={this.props.admin}
      filter={this.state.filter}
      onChange={this.handleFilter}
      projects={this.filterProjects()}
    />
}

const mapStateToProps = (state) => (
  {
    admin : state.auth.admin,
    projects : state.projects.data.items
  }
)

ProjectListContainer.propTypes = {
  admin : PropTypes.bool.isRequired,
  projects : PropTypes.arrayOf(PropTypes.object)
}

export default connect(
  mapStateToProps,
  null
)(ProjectListContainer)
