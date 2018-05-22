import NavBar from "../component/widgets/navbar"
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { Container } from "semantic-ui-react"
import { logout } from "../action/auth"

class NavBarContainer extends React.Component {
  handleLogout = () =>
    this.props.logout()

  render = () =>
    <div className="full-width-bg-black">
      <div
        className="wrapper"
        style={{ padding : "0.5rem 0rem" }}
      >
        <Container textAlign="right">
          <NavBar
            auth={this.props.auth}
            logout={this.handleLogout}
          />
        </Container>
      </div>
    </div>
}

const mapStateToProps = (state) =>
  ({ auth : state.auth })

NavBarContainer.propTypes = {
  auth : PropTypes.object.isRequired,
  logout : PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  { logout }
)(NavBarContainer)
