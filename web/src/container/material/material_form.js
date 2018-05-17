import MaterialForm from "../../component/forms/material_form"
import React from "react"
import { Button, Divider, Form } from "semantic-ui-react"
import { connect } from "react-redux"
import { materialState } from "../../util/form_state"

class MaterialFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = materialState(props.material)
  }

  handleChange = (e, { name, value }) =>
    this.setState({ [name] : value })

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  render = () => {
    let { errors, pending, readOnly } = this.props

    return (
      <Form
        loading={pending}
        onSubmit={this.handleSubmit}
      >
        <MaterialForm
          errors={errors}
          onChange={this.handleChange}
          readOnly={readOnly}
          state={this.state}
        />
        <Divider hidden />
        {( readOnly )
          ? null
          : <Button content="Tallenna" fluid />
        }
      </Form>
    )
  }
}

const mapStateToProps = (state) => (
  {
    errors : state.materials.write.errors,
    pending : state.materials.write.pending,
    readOnly : ( !state.auth.admin )
  }
)

export default connect(
  mapStateToProps,
  null
)(MaterialFormContainer)
