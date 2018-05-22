import EmptyList from "../alerts/empty_list"
import PropTypes from "prop-types"
import React from "react"
import { Link } from "react-router-dom"
import { List } from "semantic-ui-react"

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

const EmployeeList = ({ employees }) =>
  <List divided relaxed>
    {( employees.length > 0 )
      ? employees.map(asRow)
      : <EmptyList />
    }
  </List>

EmployeeList.propTypes = {
  employees : PropTypes.arrayOf(PropTypes.object).isRequired
}

export default EmployeeList
