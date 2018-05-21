import AttachmentFormContainer from "./attachment_form"
import AttachmentList from "../../component/lists/attachment_list"
import Expandable from "../../component/widgets/expandable"
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { Divider } from "semantic-ui-react"
import { uploadAttachment } from "../../action/attachment"

class AttachmentContainer extends React.Component {
  upload = (data) => {
    let { entity, id, thunk, token, uploadAttachment } = this.props

    data.append("id", id)
    data.append("entity", entity)

    uploadAttachment(id, data, token, thunk, this.expandable.toggle)
  }

  render = () =>
    <div>
      <AttachmentList
        attachments={this.props.attachments}
      />
      <Divider />
      <Expandable
        button="Lisää liite"
        ref={c => this.expandable = c}
      >
        <AttachmentFormContainer
          onSubmit={this.upload}
        />
      </Expandable>
    </div>
}

const mapStateToProps = (state) =>
  ({ token : state.auth.token })

AttachmentContainer.propTypes = {
  attachments : PropTypes.arrayOf(PropTypes.object).isRequired,
  entity : PropTypes.string.isRequired,
  id : PropTypes.string.isRequired,
  thunk : PropTypes.func.isRequired,
  token : PropTypes.string.isRequired,
  uploadAttachment : PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  { uploadAttachment }
)(AttachmentContainer)
