import PropTypes from "prop-types"
import React from "react"
import { Icon, Menu, Popup } from "semantic-ui-react"
import { Link } from "react-router-dom"

const items = (logout) => [
  {
    key : "projects",
    content : "Työmaat",
    as : Link,
    to : "/projects",
    admin : 0
  },
  {
    key : "tasks",
    content : "Tehtävät",
    as : Link,
    to : "/tasks",
    admin : 0
  },
  {
    key : "clients",
    content : "Asiakkaat",
    as : Link,
    to : "/clients",
    admin : 1
  },
  {
    key : "materials",
    content : "Materiaalit",
    as : Link,
    to : "/materials",
    admin : 0
  },
  {
    key : "employees",
    content : "Henkilöstö",
    as : Link,
    to : "/employees",
    admin : 0
  },
  {
    key : "my",
    content : "Oma sivu",
    as : Link,
    to : "/my",
    admin : 0
  },
  {
    key : "logout",
    content : "Kirjaudu ulos",
    as : Link,
    to : "/",
    onClick : logout,
    admin : 0
  }
]

const menu = (admin, logout) => (
  <Menu
    items={( admin )
      ? items(logout)
      : items(logout).filter(i => i.admin === 0)
    }
    secondary
    vertical
  />
)

const NavBar = ({ auth, logout }) =>
  <Popup
    content={menu(auth.admin, logout)}
    on="click"
    trigger={
      <Icon
        inverted
        name="bars"
        size="large"
      />
    }
  />

NavBar.propTypes = {
  auth : PropTypes.object.isRequired,
  logout : PropTypes.func.isRequired,
}

export default NavBar
