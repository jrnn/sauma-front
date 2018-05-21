import PropTypes from "prop-types"
import QuotaForm from "../component/forms/quota_form"
import React from "react"
import { connect } from "react-redux"
import { quotaOptions } from "../util/form_options"

class QuotaFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = { quotas : props.quotas }
  }

  handleAdd = (e, { value }) => {
    let material = this.props.materials
      .find(m => m.id === value)

    let quotas = [
      ...this.state.quotas,
      { material, quantity : 0 }
    ]

    this.setState({ quotas })
    this.props.sync(quotas)
  }

  handleChange = (e, { name, value }) => {
    let quotas = this.state.quotas
      .map(q => ( q.material.id === name )
        ? { ...q, quantity : value }
        : q
      )

    this.setState({ quotas })
    this.props.sync(quotas)
  }

  handleDelete = (e, { name }) => {
    e.preventDefault()

    let quotas = this.state.quotas
      .filter(q => q.material.id !== name)

    this.setState({ quotas })
    this.props.sync(quotas)
  }

  render = () =>
    <QuotaForm
      header={this.props.header}
      onAdd={this.handleAdd}
      onChange={this.handleChange}
      onDelete={this.handleDelete}
      options={quotaOptions(
        this.props.materials, this.state.quotas)
      }
      readOnly={this.props.readOnly}
      state={this.state}
    />
}

const mapStateToProps = (state) =>
  ({ materials : state.materials.data.items })

QuotaFormContainer.propTypes = {
  header : PropTypes.string.isRequired,
  materials : PropTypes.arrayOf(PropTypes.object).isRequired,
  quotas : PropTypes.arrayOf(PropTypes.object).isRequired,
  readOnly : PropTypes.bool.isRequired,
  sync : PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  null
)(QuotaFormContainer)
