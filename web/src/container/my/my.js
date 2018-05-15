import Accordion from "../../component/accordion"
import MyFormContainer from "./my_form"
import MyPasswordContainer from "./my_password"
import React from "react"
import { connect } from "react-redux"
import { resetWriteEmployee } from "../../action/employee"

class MyContainer extends React.Component {
  componentWillUnmount = () =>
    this.props.reset()

  render = () => {
    let { employee } = this.props

    return (
      <div>
        <Accordion active={true} title="Perustiedot">
          <MyFormContainer employee={employee || {}} />
        </Accordion>
        <Accordion title="Salasanan vaihto">
          <MyPasswordContainer />
        </Accordion>
        <Accordion title="Suoritteet">
          <p>TULOSSA PIAN</p>
        </Accordion>
        <Accordion title="<Placeholder>">
          <p>Jotain muuta vielä...?</p>
        </Accordion>
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    employee : state.employees.data.items
      .find(e => e.id === state.auth.id)
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    reset : () => {
      dispatch(resetWriteEmployee())
    }
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyContainer)
