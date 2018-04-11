import Dummy from "./component/dummy"
import LoginContainer from "./component/login_container"
import React from "react"
import { connect } from "react-redux"
import { Container } from "semantic-ui-react"
import { getAuth } from "./reducer/actions"

class App extends React.Component {
  componentDidMount = () => this.props.getAuth()

  render() {
    return (
      <Container className="padded">
        {this.props.auth === null
          ? <LoginContainer />
          : <Dummy />
        }
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({ auth : state.auth })

export default connect(
  mapStateToProps,
  { getAuth }
)(App)
