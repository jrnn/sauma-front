import ProjectList from "../component/project_list"
import React from "react"
import Spinner from "../component/spinner"
import { connect } from "react-redux"
import { getProjects, resetProjects } from "../action/project"
import { withRouter } from "react-router-dom"

class ProjectListContainer extends React.Component {
  constructor() {
    super()
    this.state = { filter : "" }
  }

  componentDidMount = () =>
    this.props.getProjects(this.props.auth.token)

  componentWillUnmount = () =>
    this.props.resetProjects()

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

  render() {
    let { auth, error, pending } = this.props

    if ( pending ) return (
      <Spinner />
    )

    if ( error ) return (
      <h1 align="center">{error}</h1>
    )

    return (
      <ProjectList
        admin={auth.admin}
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
    error : state.projects.all.error,
    pending : state.projects.all.pending,
    projects : state.projects.all.data
  }
)

export default withRouter(connect(
  mapStateToProps,
  { getProjects, resetProjects }
)(ProjectListContainer))
