import EmptyList from "../alerts/empty_list"
import PropTypes from "prop-types"
import React from "react"
import SearchField from "../widgets/search_field"
import { Button, Divider, List } from "semantic-ui-react"
import { Link } from "react-router-dom"

const asRow = (e) =>
  <List.Item
    as={Link}
    key={e.id}
    to={`/employees/${e.id}`}
  >
    <List.Icon
      color="grey"
      name={( e.enabled )
        ? "check"
        : "ban"
      }
      verticalAlign="middle"
    />
    <List.Content>
      <List.Header
        content={`${e.lastName}, ${e.firstName}`}
      />
      <List.Description
        content={( e.administrator )
          ? "Työnjohtaja"
          : "Työntekijä"
        }
      />
    </List.Content>
  </List.Item>

const buttons = (admin) =>
  ( !admin )
    ? null
    : <div>
      <Divider />
      <Button
        as={Link}
        content="Lisää uusi"
        fluid
        to="/employees/new"
      />
    </div>

const EmployeeList = (props) =>
  <div>
    <SearchField
      onChange={props.onChange}
      value={props.filter}
    />
    <List divided relaxed>
      {( props.employees.length > 0 )
        ? props.employees.map(asRow)
        : <EmptyList />
      }
    </List>
    {buttons(props.admin)}
  </div>

EmployeeList.propTypes = {
  admin : PropTypes.bool.isRequired,
  employees : PropTypes.arrayOf(PropTypes.object).isRequired,
  filter : PropTypes.string.isRequired,
  onChange : PropTypes.func.isRequired
}

export default EmployeeList
