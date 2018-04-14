import LoginFormContainer from "./container/login_form"
import Notification from "./component/notification"
import React from "react"
import RootContainer from "./container/root"
import { connect } from "react-redux"
import { Container } from "semantic-ui-react"
import { getAuth } from "./action/auth"
import { withRouter } from "react-router-dom"

class App extends React.Component {
  componentDidMount = () =>
    this.props.getAuth()

  render() {
    return (
      <Container className="padded">
        <Notification />
        {this.props.auth === null
          ? <LoginFormContainer />
          : <RootContainer />
        }
      </Container>
    )
  }
}

const mapStateToProps = (state) =>
  ({ auth : state.auth })

export default withRouter(connect(
  mapStateToProps,
  { getAuth }
)(App))
