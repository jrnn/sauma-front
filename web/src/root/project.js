import ProjectContainer from "../container/project/project"
import ProjectListContainer from "../container/project/project_list"
import React from "react"
import Spinner from "../component/spinner"
import { connect } from "react-redux"
import { fetchProjectsIfNeeded } from "../action/project"
import { Route } from "react-router-dom"

class ProjectRoot extends React.Component {
  componentDidMount = () =>
    this.props.refresh(this.props.token)

  render = () => {
    let { error, match, pending } = this.props

    if ( pending ) return (
      <Spinner />
    )

    if ( error ) return (
      <h1 align="center">{error}</h1>
    )

    return (
      <div>
        <h2 className="padded">Työmaat</h2>
        <Route
          component={ProjectContainer}
          exact path={`${match.path}/:id`}
        />
        <Route
          component={ProjectListContainer}
          exact path={match.path}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    error : state.projects.data.error,
    pending : state.projects.data.pending,
    token : state.auth.token
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    refresh : (token) => {
      dispatch(fetchProjectsIfNeeded(token))
    }
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectRoot)
