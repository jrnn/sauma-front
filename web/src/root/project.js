import Error from "../component/alerts/error"
import ProjectContainer from "../container/project/project"
import ProjectListContainer from "../container/project/project_list"
import PropTypes from "prop-types"
import React from "react"
import Spinner from "../component/widgets/spinner"
import { connect } from "react-redux"
import { fetchProjectsIfNeeded } from "../action/project"
import { Route } from "react-router-dom"

class ProjectRoot extends React.Component {
  componentDidMount = () =>
    this.props.refresh(this.props.token)

  render = () => {
    let { error, match, pending } = this.props

    if ( pending ) return (<Spinner />)
    if ( error ) return (<Error message={error} />)

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

ProjectRoot.propTypes = {
  error : PropTypes.string,
  match : PropTypes.object.isRequired,
  pending : PropTypes.bool.isRequired,
  refresh : PropTypes.func.isRequired,
  token : PropTypes.string.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectRoot)
