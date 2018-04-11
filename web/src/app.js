import LoginWrapper from "./container/login_wrapper"
import Notification from "./component/notification"
import React from "react"
import RootWrapper from "./container/root_wrapper"
import { connect } from "react-redux"
import { Container } from "semantic-ui-react"
import { getAuth } from "./reducer/actions"
import { withRouter } from "react-router-dom"

class App extends React.Component {
  componentDidMount = () => this.props.getAuth()

  render() {
    return (
      <Container className="padded">
        <Notification />
        {this.props.auth === null
          ? <LoginWrapper />
          : <RootWrapper />
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
