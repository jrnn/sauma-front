import React from "react"
import { connect } from "react-redux"
import { logout, notify } from "../reducer/actions"

class Dummy extends React.Component {
  handleLogout = (e) => {
    e.preventDefault()
    this.props.logout()
    this.props.notify("Olet nyt kirjautunut ulos", "success", 5)
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
  { logout, notify }
)(Dummy)
