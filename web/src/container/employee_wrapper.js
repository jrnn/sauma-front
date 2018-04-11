import EmployeeList from "../component/employee_list"
import React from "react"
import { Container } from "semantic-ui-react"
import { Route } from "react-router-dom"

class EmployeeWrapper extends React.Component {
  render() {
    const { match } = this.props

    return (
      <Container className="padded">
        <Route
          exact path={match.url}
          component={EmployeeList}
        />
        <Route
          path={`${match.url}/:id`}
          render={({ match }) => <p>{match.params.id}</p>}
        />
      </Container>
    )
  }
}

export default EmployeeWrapper
