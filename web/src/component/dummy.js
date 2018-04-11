import React from "react"
import { connect } from "react-redux"
import { logout } from "../reducer/actions"

class Dummy extends React.Component {
  handleLogout = (e) => {
    e.preventDefault()
    this.props.logout()
    // set notification
  }

  render() {
    return (
      <div>
        <p>Now you logged in fool</p>
        <button onClick={this.handleLogout}>LOGOUT</button>
      </div>
    )
  }
}

export default connect(
  null,
  { logout }
)(Dummy)
