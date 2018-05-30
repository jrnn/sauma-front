import EmptyList from "../alerts/empty_list"
import PropTypes from "prop-types"
import React from "react"
import { formatDate } from "../../util/parser"
import { List } from "semantic-ui-react"

const asRow = (c) =>
  <List.Item key={c.createdOn} >
    <List.Icon
      color="grey"
      name="comment outline"
      verticalAlign="middle"
    />
    <List.Content>
      <List.Header
        content={`${formatDate(c.createdOn)} — ${c.owner.firstName} ${c.owner.lastName}`}
      />
      <List.Description content={c.text} />
    </List.Content>
  </List.Item>

const CommentList = ({ comments }) =>
  <List divided relaxed>
    {( comments.length > 0 )
      ? comments
        .sort((c1, c2) =>
          Date.parse(c1.createdOn) - Date.parse(c2.createdOn))
        .map(asRow)
      : <EmptyList />
    }
  </List>

CommentList.propTypes = {
  comments : PropTypes.arrayOf(PropTypes.object).isRequired
}

export default CommentList
