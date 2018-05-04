import MaterialForm from "../../component/material_form"
import React from "react"
import { Button, Divider, Form } from "semantic-ui-react"
import { connect } from "react-redux"
import { materialState } from "../../util/form_state"
import { resetWriteMaterial } from "../../action/material"
import { withRouter } from "react-router-dom"

const initState = (m) => {
  let state = materialState(m)
  return state
}

class MaterialFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = initState(props.material)
  }

  componentWillUnmount = () =>
    this.props.resetWriteMaterial()

  handleChange = (e, { name, value }) =>
    this.setState({ [name] : value })

  handleSubmit = async (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  render = () => {
    let { auth, errors, pending } = this.props

    let buttons = ( !auth.admin )
      ? null
      : <Button content="Tallenna" fluid />

    return (
      <Form
        loading={pending}
        onSubmit={this.handleSubmit}
      >
        <MaterialForm
          errors={errors}
          onChange={this.handleChange}
          readOnly={( !auth.admin )}
          state={this.state}
        />
        <Divider hidden />
        {buttons}
      </Form>
    )
  }
}

const mapStateToProps = (state) => (
  {
    auth : state.auth,
    errors : state.materials.write.errors,
    pending : state.materials.write.pending
  }
)

export default withRouter(connect(
  mapStateToProps,
  { resetWriteMaterial }
)(MaterialFormContainer))
