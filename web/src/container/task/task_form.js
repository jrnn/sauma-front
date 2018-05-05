import React from "react"
import TaskForm from "../../component/task_form"
import { Button, Divider, Form } from "semantic-ui-react"
import { connect } from "react-redux"
import { resetWriteTask } from "../../action/task"
import { taskState } from "../../util/form_state"
import { withRouter } from "react-router-dom"

const initState = (t) => {
  let state = taskState(t)
  //state.quotas = ... PROBABLY NEED A SEPARATE SUBFORM (CF. ADDRESS) ?

  return state
}

class TaskFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = initState(props.task)
  }

  componentWillUnmount = () =>
    this.props.resetWriteTask()

  handleChange = (e, data) => {
    let value = data.type === "checkbox"
      ? data.checked
      : data.value

    this.setState({ [data.name] : value })
  }

  handleSubmit = async (e) => {
    e.preventDefault(e)
    this.props.onSubmit(this.state)
  }

  render = () => {
    let { auth, errors, pending, task } = this.props

    let buttons = ( !auth.admin )
      ? null
      : <Button content="Tallenna" fluid />

    return (
      <Form
        loading={pending}
        onSubmit={this.handleSubmit}
      >
        <TaskForm
          errors={errors}
          onChange={this.handleChange}
          project={task.project || {}}
          readOnly={( !auth.admin )}
          state={this.state}
        />
        <Divider hidden />
        {buttons}
      </Form>
    )
  }
}

const mapStateToProps = (state) => (
  {
    auth : state.auth,
    errors : state.tasks.write.errors,
    pending : state.tasks.write.pending
  }
)

export default withRouter(connect(
  mapStateToProps,
  { resetWriteTask }
)(TaskFormContainer))
