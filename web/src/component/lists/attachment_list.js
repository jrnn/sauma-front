import EmptyList from "../alerts/empty_list"
import PropTypes from "prop-types"
import React from "react"
import { formatDate } from "../../util/parser"
import { List } from "semantic-ui-react"

const asRow = (a) =>
  <List.Item
    as="a"
    href={a.url}
    key={a.key}
    target="_blank"
  >
    <List.Icon
      color="grey"
      name="file text outline"
      verticalAlign="middle"
    />
    <List.Content>
      <List.Header content={a.name} />
      <List.Description
        content={`${formatDate(a.createdOn)} — ${a.owner.firstName} ${a.owner.lastName}`}
      />
    </List.Content>
  </List.Item>

const AttachmentList = ({ attachments }) =>
  <List divided relaxed>
    {( attachments.length > 0 )
      ? attachments
        .sort((a1, a2) =>
          Date.parse(a2.createdOn) - Date.parse(a1.createdOn))
        .map(asRow)
      : <EmptyList />
    }
  </List>

AttachmentList.propTypes = {
  attachments : PropTypes.arrayOf(PropTypes.object).isRequired
}

export default AttachmentList
