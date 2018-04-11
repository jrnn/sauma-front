import React from "react"
import { Link } from "react-router-dom"
import { Menu } from "semantic-ui-react"

const NavBar = ({ handleLogout }) => (
  <div>
    <Menu>
      <Menu.Item
        as={Link} to="/projects"
        content="Työmaat"
        disabled
      />
      <Menu.Item
        as={Link} to="/clients"
        content="Asiakkaat"
        disabled
      />
      <Menu.Item
        as={Link} to="/employees"
        content="Henkilöstö"
      />
      <Menu.Item
        as={Link} to="/"
        content="Kirjaudu ulos"
        onClick={handleLogout}
      />
    </Menu>
  </div>
)

export default NavBar
