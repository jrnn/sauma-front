import EmployeeDetailsContainer from "./employee_details"
import EmployeeListContainer from "./employee_list"
import NavBar from "../component/navbar"
import React from "react"
import { connect } from "react-redux"
import { Container } from "semantic-ui-react"
import { logout, notify } from "../reducer/actions"
import { Redirect, Route, Switch, withRouter } from "react-router-dom"

class RootContainer extends React.Component {
  handleLogout = () => {
    let { logout, notify } = this.props

    logout()
    notify("Olet nyt kirjautunut ulos", "success", 5)
  }

  render() {
    return (
      <Container>
        <NavBar handleLogout={this.handleLogout} />
        <Container className="padded">
          <Switch>
            <Route
              exact path="/employees/:id"
              render={props =>
                <EmployeeDetailsContainer
                  isNew={props.match.params.id === "new"}
                  {...props}
                />
              }
            />
            <Route
              exact path="/employees"
              component={EmployeeListContainer}
            />
            <Redirect to="/" />
          </Switch>
        </Container>
      </Container>
    )
  }
}

export default withRouter(connect(
  null,
  { logout, notify }
)(RootContainer))
