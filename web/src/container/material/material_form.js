import MaterialForm from "../../component/forms/material_form"
import PropTypes from "prop-types"
import React from "react"
import { Button, Divider, Form } from "semantic-ui-react"
import { connect } from "react-redux"
import { createMaterial, updateMaterial } from "../../action/material"
import { materialState } from "../../util/form_state"
import { parseNumber } from "../../util/parser"
import { withRouter } from "react-router-dom"

class MaterialFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = materialState(props.material)
  }

  handleChange = (e, { name, value }) =>
    this.setState({ [name] : value })

  handleSubmit = (e) => {
    e.preventDefault()

    let { history, id, isNew, token } = this.props
    this.props.save(this.state, history, id, isNew, token)
  }

  render = () =>
    <Form
      loading={this.props.pending}
      onSubmit={this.handleSubmit}
    >
      <MaterialForm
        errors={this.props.errors}
        onChange={this.handleChange}
        readOnly={this.props.readOnly}
        state={this.state}
      />
      <Divider hidden />
      {( this.props.readOnly )
        ? null
        : <Button content="Tallenna" fluid />
      }
    </Form>
}

const mapStateToProps = (state) => (
  {
    errors : state.materials.write.errors,
    pending : state.materials.write.pending,
    readOnly : ( !state.auth.admin ),
    token : state.auth.token
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    save : (data, history, id, isNew, token) => {
      let payload = {
        ...data,
        unitCost : parseNumber(data.unitCost)
      }
      return ( isNew )
        ? dispatch(createMaterial(payload, token, history))
        : dispatch(updateMaterial(id, payload, token))
    }
  }
)

MaterialFormContainer.propTypes = {
  errors : PropTypes.object.isRequired,
  history : PropTypes.object.isRequired,
  id : PropTypes.string.isRequired,
  isNew : PropTypes.bool.isRequired,
  material : PropTypes.object.isRequired,
  pending : PropTypes.bool.isRequired,
  readOnly : PropTypes.bool.isRequired,
  save : PropTypes.func.isRequired,
  token : PropTypes.string.isRequired
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MaterialFormContainer))
