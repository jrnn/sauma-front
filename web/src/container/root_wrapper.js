import EmployeeWrapper from "./employee_wrapper"
import NavBar from "../component/navbar"
import React from "react"
import { Redirect, Route, Switch, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { initState, logout, notify } from "../reducer/actions"

class RootWrapper extends React.Component {
  componentDidMount = () => this.props.initState()

  handleLogout = () => {
    let { logout, notify } = this.props

    logout()
    notify("Olet nyt kirjautunut ulos", "success", 5)
  }

  render() {
    return (
      <div>
        <NavBar handleLogout={this.handleLogout} />
        <Switch>
          <Route
            exact path="/"
            render={() => <p>Under construction</p>}
          />
          <Route
            path="/employees"
            component={EmployeeWrapper}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    )
  }
}

export default withRouter(connect(
  null,
  { initState, logout, notify }
)(RootWrapper))
