import ClientDetailsContainer from "./client_details"
import ClientListContainer from "./client_list"
import EmployeeDetailsContainer from "./employee_details"
import EmployeeListContainer from "./employee_list"
import ProjectDetailsContainer from "./project_details"
import ProjectListContainer from "./project_list"
import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"

const RootContainer = () => (
  <Switch>
    <Route
      exact path="/clients/:id"
      render={props =>
        <ClientDetailsContainer
          isNew={props.match.params.id === "new"}
          {...props}
        />
      }
    />
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
      exact path="/projects/:id"
      render={props =>
        <ProjectDetailsContainer
          isNew={props.match.params.id === "new"}
          {...props}
        />
      }
    />
    <Route
      exact path="/clients"
      component={ClientListContainer}
    />
    <Route
      exact path="/employees"
      component={EmployeeListContainer}
    />
    <Route
      exact path="/projects"
      component={ProjectListContainer}
    />
    <Redirect to="/" />
  </Switch>
)

export default RootContainer
