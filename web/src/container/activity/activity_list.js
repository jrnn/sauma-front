import ActivityList from "../../component/lists/activity_list"
import PropTypes from "prop-types"
import React from "react"
import SearchField from "../../component/widgets/search_field"

class ActivityListContainer extends React.Component {
  constructor() {
    super()
    this.state = { filter : "" }
  }

  filterActivities = () => {
    let { filter } = this.state

    return this.props.activities
      .filter(a => `${a.owner.lastName}, ${a.owner.firstName}`
        .toLowerCase().includes(filter))
      .sort((a1, a2) => {
        let a = `${a1.owner.lastName}, ${a1.owner.firstName}`
        let b = `${a2.owner.lastName}, ${a2.owner.firstName}`

        return a.localeCompare(b)
      })
  }

  handleFilter = (e, { value }) =>
    this.setState({ filter : value.toLowerCase() })

  render = () =>
    <div>
      <SearchField
        onChange={this.handleFilter}
        value={this.state.filter}
      />
      <ActivityList
        activities={this.filterActivities()}
      />
    </div>
}

ActivityListContainer.propTypes = {
  activities : PropTypes.arrayOf(PropTypes.object)
}

export default ActivityListContainer
