import QuotaForm from "../../component/quota_form"
import React from "react"
import TaskForm from "../../component/task_form"
import { Button, Divider, Form } from "semantic-ui-react"
import { connect } from "react-redux"
import { resetWriteTask } from "../../action/task"
import { taskState } from "../../util/form_state"

class TaskFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = taskState(props.task)
  }

  componentWillUnmount = () =>
    this.props.resetWriteTask()

  dropdownMaterials = () => {
    let { quotas } = this.state
    let { materials } = this.props
    let materialIds = quotas.map(q => q.material.id)

    return materials
      .filter(m => !materialIds.includes(m.id))
      .sort((m1, m2) => m1.name.localeCompare(m2.name))
      .map(m => ({
        key : m.id,
        text : `${m.name} (${m.color})`,
        value : m.id
      }))
  }

  handleChange = (e, data) => {
    let value = data.type === "checkbox"
      ? data.checked
      : data.value

    this.setState({ [data.name] : value })
  }

  handleDropdown = (e, { value }) => {
    let material = this.props.materials
      .find(m => m.id === value)

    this.setState({
      quotas : [
        ...this.state.quotas,
        { material, quantity : 0 }
      ]
    })
  }

  handleQuotaChange = (e, { name, value }) => {
    let quotas = this.state.quotas
      .map(q => {
        if (q.material.id === name)
          return { ...q, quantity : value }
        else
          return q
      })

    this.setState({ quotas })
  }

  handleQuotaDelete = (e, { name }) => {
    e.preventDefault()

    this.setState({
      quotas : this.state.quotas
        .filter(q => q.material.id !== name)
    })
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
        <Divider />
        <QuotaForm
          dropdownChange={this.handleDropdown}
          header="Materiaaliarvio"
          onChange={this.handleQuotaChange}
          onDelete={this.handleQuotaDelete}
          options={this.dropdownMaterials()}
          readOnly={( !auth.admin )}
          state={this.state}
        />
        <Divider />
        <Form.Field className="padded">
          <Form.Checkbox
            checked={this.state.completed}
            label="Suoritettu loppuun"
            name="completed"
            onChange={this.handleChange}
            readOnly={( !auth.admin )}
          />
        </Form.Field>
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

export default connect(
  mapStateToProps,
  { resetWriteTask }
)(TaskFormContainer)
