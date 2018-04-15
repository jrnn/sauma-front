import NavBar from "../component/navbar"
import React from "react"
import { connect } from "react-redux"
import { logout } from "../action/auth"
import { notify } from "../action/notification"
import { withRouter } from "react-router-dom"

class NavBarContainer extends React.Component {
  handleLogout = () => {
    this.props.logout()
    this.props.notify("Olet nyt kirjautunut ulos", "success", 5)
  }

  render() {
    return (
      <NavBar
        admin={this.props.auth.admin || false}
        logout={this.handleLogout}
      />
    )
  }
}

const mapStateToProps = (state) =>
  ({ auth : state.auth })

export default withRouter(connect(
  mapStateToProps,
  { logout, notify }
)(NavBarContainer))
