import MyContainer from "../container/my/my"
import React from "react"
import Spinner from "../component/spinner"
import { connect } from "react-redux"
import { fetchEmployeesIfNeeded } from "../action/employee"
import { Route } from "react-router-dom"

class MyRoot extends React.Component {
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
        <h2 className="padded">Omat tietoni</h2>
        <Route
          component={MyContainer}
          exact path={match.path}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    error : state.employees.data.error,
    pending : state.employees.data.pending,
    token : state.auth.token
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    refresh : (token) => {
      dispatch(fetchEmployeesIfNeeded(token))
    }
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyRoot)
