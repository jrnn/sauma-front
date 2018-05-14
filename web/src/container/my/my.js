import MyDetailsContainer from "./my_details"
import React from "react"
import Spinner from "../../component/spinner"
import { connect } from "react-redux"
import { fetchEmployeesIfNeeded } from "../../action/employee"
import { Route } from "react-router-dom"

class MyContainer extends React.Component {
  componentDidMount = () =>
    this.props.refreshState(this.props.auth.token)

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
        <h2 className="padded">Omat tietoni</h2>
        <Route
          exact path={match.path}
          component={MyDetailsContainer}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    auth : state.auth,
    error : state.employees.data.error,
    pending : state.employees.data.pending
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    refreshState : (token) => {
      dispatch(fetchEmployeesIfNeeded(token))
    }
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyContainer)
