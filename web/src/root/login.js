import LoginFormContainer from "../container/login_form"
import React from "react"
import ResetPasswordContainer from "../container/reset_password"
import { Redirect, Route, Switch } from "react-router-dom"
import { withRouter } from "react-router-dom"

const LoginRoot = () =>
  <Switch>
    <Route
      component={ResetPasswordContainer}
      exact path="/reset/:token"
    />
    <Route
      component={LoginFormContainer}
      path="/"
    />
    <Redirect to="/" />
  </Switch>

export default withRouter(LoginRoot)