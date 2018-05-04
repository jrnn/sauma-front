import React from "react"
import { Grid, Header, Icon } from "semantic-ui-react"

class Accordion extends React.Component {
  constructor(props) {
    super(props)
    this.state = { active : props.active || false }
  }

  toggle = () =>
    this.setState({ active : !this.state.active })

  render = () => {
    let { active } = this.state

    return (
      <div className="accordion">
        <Grid
          onClick={this.toggle}
          style={{
            cursor : "pointer",
            padding : "1rem 0rem"
          }}
        >
          <Grid.Column floated="left" width={13}>
            <Header content={this.props.title}/>
          </Grid.Column>
          <Grid.Column floated="right" textAlign="right" width={3}>
            <Icon
              name={( active )
                ? "chevron down"
                : "chevron up"
              }
            />
          </Grid.Column>
        </Grid>
        <div style={{
          display : ( active ) ? "" : "none",
          padding : "1rem 0rem"
        }}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Accordion
