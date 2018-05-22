import PropTypes from "prop-types"
import QuotaFormContainer from "../quota_form"
import React from "react"
import TaskForm from "../../component/forms/task_form"
import { Button, Divider, Form } from "semantic-ui-react"
import { connect } from "react-redux"
import { createTask, updateTask } from "../../action/task"
import { parseNumber, parseQuotas } from "../../util/parser"
import { taskState } from "../../util/form_state"
import { withRouter } from "react-router-dom"

class TaskFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = taskState(props.task)
  }

  handleChange = (e, data) => {
    let value = ( data.type === "checkbox" )
      ? data.checked
      : data.value

    this.setState({ [data.name] : value })
  }

  handleSubmit = (e) => {
    e.preventDefault(e)

    let { history, id, isNew, project, token } = this.props
    this.props.save(this.state, history, id, isNew, project, token)
  }

  syncQuotaState = (quotas) =>
    this.setState({ ...this.state, quotas })

  render = () =>
    <Form
      loading={this.props.pending}
      onSubmit={this.handleSubmit}
    >
      <TaskForm
        errors={this.props.errors}
        onChange={this.handleChange}
        project={this.props.task.project || {}}
        readOnly={this.props.readOnly}
        state={this.state}
      />
      <Divider />
      <QuotaFormContainer
        header="Materiaaliarvio"
        quotas={this.state.quotas}
        readOnly={this.props.readOnly}
        sync={this.syncQuotaState}
      />
      <Divider hidden />
      <Form.Field className="padded">
        <Form.Checkbox
          checked={this.state.completed}
          label="Suoritettu loppuun"
          name="completed"
          onChange={this.handleChange}
          readOnly={this.props.readOnly}
        />
      </Form.Field>
      <Divider hidden />
      {( this.props.readOnly )
        ? null
        : <Button content="Tallenna" fluid />
      }
    </Form>
}

const mapStateToProps = (state) => (
  {
    errors : state.tasks.write.errors,
    pending : state.tasks.write.pending,
    readOnly : ( !state.auth.admin ),
    token : state.auth.token
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    save : (data, history, id, isNew, project, token) => {
      let payload = {
        ...data,
        daysNeeded : parseNumber(data.daysNeeded),
        project : project.id || null,
        quotas : parseQuotas(data.quotas)
      }
      return ( isNew )
        ? dispatch(createTask(payload, token, history))
        : dispatch(updateTask(id, payload, token))
    }
  }
)

TaskFormContainer.propTypes = {
  errors : PropTypes.object.isRequired,
  history : PropTypes.object.isRequired,
  id : PropTypes.string.isRequired,
  isNew : PropTypes.bool.isRequired,
  pending : PropTypes.bool.isRequired,
  project : PropTypes.object.isRequired,
  readOnly : PropTypes.bool.isRequired,
  save : PropTypes.func.isRequired,
  task : PropTypes.object.isRequired,
  token : PropTypes.string.isRequired
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskFormContainer))
