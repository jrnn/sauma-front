import ActivityForm from "../../component/activity_form"
import QuotaForm from "../../component/quota_form"
import React from "react"
import { activityState } from "../../util/form_state"
import { Button, Divider, Form } from "semantic-ui-react"
import { connect } from "react-redux"
import { resetWriteActivity } from "../../action/activity"

class ActivityFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = activityState(props.activity)
  }

  componentWillUnmount = () =>
    this.props.resetWriteActivity()

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

  handleSave = async (e) => {
    e.preventDefault(e)
    this.props.onSave(this.state)
  }

  handleSign = async (e) => {
    e.preventDefault(e)
    this.props.onSign(this.state)
  }

  render = () => {
    let { activity, auth, errors, isNew, pending } = this.props

    let canSign = ( isNew )
      ? false
      : ( auth.admin && !activity.signed )
    let isOwner = ( isNew )
      ? true
      : ( !activity.signed && auth.id === activity.owner.id )

    let saveButton = ( !isOwner )
      ? null
      : <Button
        content="Tallenna"
        fluid
        onClick={this.handleSave}
      />

    let signButton = ( !canSign )
      ? null
      : <Button
        content="Hyväksy"
        fluid
        onClick={this.handleSign}
      />

    return (
      <Form loading={pending}>
        <ActivityForm
          activity={activity}
          errors={errors}
          onChange={this.handleChange}
          readOnly={( !isOwner )}
          state={this.state}
        />
        <Divider />
        <QuotaForm
          dropdownChange={this.handleDropdown}
          header="Käytetyt materiaalit"
          onChange={this.handleQuotaChange}
          onDelete={this.handleQuotaDelete}
          options={this.dropdownMaterials()}
          readOnly={( !isOwner )}
          state={this.state}
        />
        <Divider hidden />
        {saveButton}
        <Divider hidden />
        {signButton}
      </Form>
    )
  }
}

const mapStateToProps = (state) => (
  {
    auth : state.auth,
    errors : state.activities.write.errors,
    pending : state.activities.write.pending
  }
)

export default connect(
  mapStateToProps,
  { resetWriteActivity }
)(ActivityFormContainer)
