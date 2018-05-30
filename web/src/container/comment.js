import CommentForm from "../component/forms/comment_form"
import CommentList from "../component/lists/comment_list"
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { Divider } from "semantic-ui-react"
import { uploadComment } from "../action/comment"

class CommentContainer extends React.Component {
  constructor() {
    super()
    this.state = { text : "" }
  }

  handleChange = (e, { value }) => {
    e.preventDefault()
    this.setState({ text : value })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    let { entity, id, thunk, token, uploadComment } = this.props
    let data = { entity, id, text : this.state.text }

    uploadComment(id, data, token, thunk)
  }

  validateForm = () => {
    let text = this.state.text.trim()

    if ( text.length === 0 ) return "Ei voi olla tyhjä"
    if ( text.length > 255 ) return "Korkeintaan 255 merkkiä"

    return null
  }

  render = () =>
    <div>
      <CommentList comments={this.props.comments} />
      <Divider />
      <CommentForm
        error={this.validateForm()}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        pending={this.props.pending}
        text={this.state.text}
      />
    </div>
}

const mapStateToProps = (state) => (
  {
    pending : state.comments.pending,
    token : state.auth.token
  }
)

CommentContainer.propTypes = {
  comments : PropTypes.arrayOf(PropTypes.object).isRequired,
  entity : PropTypes.string.isRequired,
  id : PropTypes.string.isRequired,
  pending : PropTypes.bool.isRequired,
  thunk : PropTypes.func.isRequired,
  token : PropTypes.string.isRequired,
  uploadComment : PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  { uploadComment }
)(CommentContainer)
