import EmployeeDetailsContainer from "./employee_details"
import EmployeeListContainer from "./employee_list"
import NavBarContainer from "../container/navbar"
import React from "react"
import { Container } from "semantic-ui-react"
import { Redirect, Route, Switch } from "react-router-dom"

const RootContainer = () => {
  return (
    <Container>
      <NavBarContainer />
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

export default RootContainer
