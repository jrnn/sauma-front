import AttachmentFormContainer from "./attachment_form"
import Expandable from "../../component/widgets/expandable"
import React from "react"
import { connect } from "react-redux"
import { Divider } from "semantic-ui-react"
import { uploadAttachment } from "../../action/attachment"

class AttachmentContainer extends React.Component {
  upload = (data) => {
    let { entity, id, thunk, token } = this.props

    data.append("id", id)
    data.append("entity", entity)

    this.props.uploadAttachment(id, data, token, thunk, this.expandable.toggle)
  }

  render = () => {
    return (
      <div>
        <p>TULOSSA : LISTA LIITTEISTÄ</p>
        <Expandable
          button="Lisää liite"
          ref={c => this.expandable = c}
        >
          <Divider />
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
  { uploadAttachment }
)(AttachmentContainer)
