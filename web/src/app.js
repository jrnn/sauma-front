import Header from "./component/header"
import LoginFormContainer from "./container/login_form"
import NavBarContainer from "./container/navbar"
import Notification from "./component/notification"
import React from "react"
import Root from "./router/root"
import { checkAuth } from "./action/auth"
import { connect } from "react-redux"
import { Container } from "semantic-ui-react"

class App extends React.Component {
  componentDidMount = () =>
    this.props.checkAuth()

  render = () => {
    return (
      <div>
        <Header />
        <NavBarContainer />
        <div className="wrapper padded">
          <Container>
            <Notification />
            {( !this.props.auth.token )
              ? <LoginFormContainer />
              : <Root />
            }
          </Container>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) =>
  ({ auth : state.auth })

export default connect(
  mapStateToProps,
  { checkAuth }
)(App)
