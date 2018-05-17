import AttachmentFormContainer from "./attachment_form"
import React from "react"
import { connect } from "react-redux"
import { uploadAttachment } from "../../action/attachment"

class AttachmentContainer extends React.Component {
  upload = (data) => {
    let { entity, id, thunk, token } = this.props

    data.append("id", id)
    data.append("entity", entity)

    this.props.uploadAttachment(id, data, token, thunk)
  }

  render = () => {
    return (
      <div>
        <p>TULOSSA : LISTA LIITTEISTÄ</p>
        <AttachmentFormContainer onSubmit={this.upload} />
      </div>
    )
  }
}

const mapStateToProps = (state) =>
  ({ token : state.auth.token })

export default connect(
  mapStateToProps,
  { uploadAttachment }
)(AttachmentContainer)
