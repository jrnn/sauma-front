import QuotaFormContainer from "../quota_form"
import React from "react"
import TaskForm from "../../component/task_form"
import { Button, Divider, Form } from "semantic-ui-react"
import { connect } from "react-redux"
import { taskState } from "../../util/form_state"

class TaskFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = taskState(props.task)
  }

  handleChange = (e, data) => {
    let value = data.type === "checkbox"
      ? data.checked
      : data.value

    this.setState({ [data.name] : value })
  }

  handleSubmit = (e) => {
    e.preventDefault(e)
    this.props.onSubmit(this.state)
  }

  syncQuotaState = (quotas) =>
    this.setState({ ...this.state, quotas })

  render = () => {
    let { errors, pending, readOnly, task } = this.props

    return (
      <Form
        loading={pending}
        onSubmit={this.handleSubmit}
      >
        <TaskForm
          errors={errors}
          onChange={this.handleChange}
          project={task.project || {}}
          readOnly={readOnly}
          state={this.state}
        />
        <Divider />
        <QuotaFormContainer
          header="Materiaaliarvio"
          quotas={this.state.quotas}
          readOnly={readOnly}
          sync={this.syncQuotaState}
        />
        <Divider />
        <Form.Field className="padded">
          <Form.Checkbox
            checked={this.state.completed}
            label="Suoritettu loppuun"
            name="completed"
            onChange={this.handleChange}
            readOnly={readOnly}
          />
        </Form.Field>
        {( readOnly )
          ? null
          : <Button content="Tallenna" fluid />
        }
      </Form>
    )
  }
}

const mapStateToProps = (state) => (
  {
    errors : state.tasks.write.errors,
    pending : state.tasks.write.pending,
    readOnly : ( !state.auth.admin )
  }
)

export default connect(
  mapStateToProps,
  null
)(TaskFormContainer)
