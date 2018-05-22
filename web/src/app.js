import Header from "./component/widgets/header"
import LoginFormContainer from "./container/login_form"
import NavBarContainer from "./container/navbar"
import Notification from "./component/alerts/notification"
import PropTypes from "prop-types"
import React from "react"
import Root from "./root/root"
import { checkAuth } from "./action/auth"
import { connect } from "react-redux"
import { Container } from "semantic-ui-react"

class App extends React.Component {
  componentDidMount = () =>
    this.props.checkAuth()

  render = () =>
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
}

const mapStateToProps = (state) =>
  ({ auth : state.auth })

App.propTypes = {
  auth : PropTypes.object.isRequired,
  checkAuth : PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  { checkAuth }
)(App)
