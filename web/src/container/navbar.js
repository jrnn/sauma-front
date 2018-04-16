import NavBar from "../component/navbar"
import React from "react"
import { connect } from "react-redux"
import { Container } from "semantic-ui-react"
import { logout } from "../action/auth"
import { notify } from "../action/notification"
import { withRouter } from "react-router-dom"

class NavBarContainer extends React.Component {
  handleLogout = () => {
    this.props.logout()
    this.props.notify("Olet nyt kirjautunut ulos", "success", 5)
  }

  render() {
    let { auth } = this.props

    return (
      <div className="full-width-bg-black">
        <div
          className="wrapper"
          style={{ padding : "0.5rem 0rem" }}
        >
          <Container textAlign="right">
            <NavBar
              auth={auth}
              logout={this.handleLogout}
            />
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
  { logout, notify }
)(NavBarContainer))
