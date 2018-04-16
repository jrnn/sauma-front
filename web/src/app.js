import Header from "./component/header"
import LoginFormContainer from "./container/login_form"
import NavBarContainer from "./container/navbar"
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
      <div>
        <Header />
        <NavBarContainer />
        <div className="wrapper padded">
          <Container>
            <Notification />
            {( this.props.auth === null )
              ? <LoginFormContainer />
              : <RootContainer />
            }
          </Container>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) =>
  ({ auth : state.auth })

export default withRouter(connect(
  mapStateToProps,
  { getAuth }
)(App))
