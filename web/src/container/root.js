import ClientContainer from "./client/client"
import EmployeeContainer from "./employee/employee"
import ProjectDetailsContainer from "./project_details"
import ProjectListContainer from "./project_list"
import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"

const RootContainer = () => (
  <Switch>
    <Route
      exact path="/projects/:id"
      render={props =>
        <ProjectDetailsContainer
          isNew={props.match.params.id === "new"}
          {...props}
        />
      }
    />
    <Route
      exact path="/projects"
      component={ProjectListContainer}
    />

    <Route
      path="/clients"
      component={ClientContainer}
    />
    <Route
      path="/employees"
      component={EmployeeContainer}
    />
    <Redirect to="/" />
  </Switch>
)

export default RootContainer
