import BackButton from "../component/widgets/back_button"
import NavBar from "../component/widgets/navbar"
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { Container, Grid, Icon } from "semantic-ui-react"
import { logout } from "../action/auth"

class NavBarContainer extends React.Component {
  handleLogout = () =>
    this.props.logout()

  render = () => {
    const { auth } = this.props
    return (
      <div className="full-width-bg-black">
        <div
          className="wrapper"
          style={{ padding : "0.5rem 1.5rem 0.5rem 0rem" }}
        >
          <Container>
            {( !auth.token )
              ? <Icon
                  name=""
                  size="large"
                />
              : <Grid>
                  <Grid.Column floated="left">
                    <BackButton />
                  </Grid.Column>
                  <Grid.Column floated="right">
                    <NavBar
                      auth={this.props.auth}
                      logout={this.handleLogout}
                    />
                  </Grid.Column>
                </Grid>
            }
          </Container>
        </div>
      </div>
    )
  }
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
