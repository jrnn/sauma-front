import AttachmentForm from "../../component/forms/attachment_form"
import React from "react"
import { connect } from "react-redux"
import { validateFile } from "../../util/form_validation"

class AttachmentFormContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      file : null,
      name : ""
    }
  }

  handleChange = (e, { name, value }) => {
    e.preventDefault()
    this.setState({ [name] : value })
  }

  handleClick = (e) => {
    e.preventDefault()
    this.filePicker.click()
  }

  handleFilePick = (e) => {
    e.preventDefault()
    this.setState({ file : e.target.files[0] })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    let data = new FormData()
    data.append("file", this.state.file)
    data.append("name", this.state.name)

    this.props.onSubmit(data)
    this.setState({ file : null, name : "" })
  }

  validateForm = () => {
    let file = validateFile(this.state.file)
    let name = this.state.name.trim()

    return {
      file : ( file.valid )
        ? null
        : file.error,
      name : ( name.length > 0 )
        ? null
        : "Liitteen nimi puuttuu"
    }
  }

  render = () =>
    <div>
      <AttachmentForm
        errors={this.validateForm()}
        onChange={this.handleChange}
        onClick={this.handleClick}
        onSubmit={this.handleSubmit}
        pending={this.props.pending}
        state={this.state}
      />
      <input
        hidden
        onChange={this.handleFilePick}
        ref={c => this.filePicker = c}
        type="file"
      />
    </div>
}

const mapStateToProps = (state) =>
  ({ pending : state.attachments.pending })

export default connect(
  mapStateToProps,
  null
)(AttachmentFormContainer)
