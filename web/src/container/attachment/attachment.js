import AttachmentFormContainer from "./attachment_form"
import AttachmentList from "../../component/attachment_list"
import Expandable from "../../component/widgets/expandable"
import React from "react"
import { connect } from "react-redux"
import { Divider } from "semantic-ui-react"
import { fetchAttachment, uploadAttachment } from "../../action/attachment"

class AttachmentContainer extends React.Component {
  fetch = (id) =>
    this.props.fetchAttachment(id, this.props.token)

  upload = (data) => {
    let { entity, id, thunk, token } = this.props

    data.append("id", id)
    data.append("entity", entity)

    this.props.uploadAttachment(id, data, token, thunk, this.expandable.toggle)
  }

  render = () => {
    return (
      <div>
        <AttachmentList
          attachments={this.props.attachments}
          onClick={this.fetch}
        />
        <Divider />
        <Expandable
          button="Lisää liite"
          ref={c => this.expandable = c}
        >
          <AttachmentFormContainer onSubmit={this.upload} />
        </Expandable>
      </div>
    )
  }
}

const mapStateToProps = (state) =>
  ({ token : state.auth.token })

export default connect(
  mapStateToProps,
  { fetchAttachment, uploadAttachment }
)(AttachmentContainer)
