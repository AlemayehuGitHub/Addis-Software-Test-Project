// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  FETCH_EMPLOYEES_IF_NEEDED,
  FETCH_EMPLOYEES,
  DELETE_EMPLOYEE
} from '../../actionTypes'
import { selectEmployees } from '../../selectors/employees'
import navigateTo from '../../services/navigation'
import EmployeesHeading from './EmployeesHeading'
import EmployeesList from './EmployeesList'

import type { Dispatch, State } from '../../types'
import type { EmployeesState } from '../../types/employees'
import type { Connector } from 'react-redux'

type Props = {
  employees: EmployeesState,
  match: {
    url: string
  },
  fetchEmployeesIfNeeded(): void,
  deleteEmployee(id: number): void,
  fetchEmployees(): void
}

class EmployeesPage extends Component<Props> {

  constructor(props: Props) {
    super(props)
    this.props.fetchEmployees()
  }

  componentDidMount() {
    this.props.fetchEmployeesIfNeeded()
  }

  handleDeleteEmployee = (id: number) => {
    if (window.confirm('Do you really want to delete this employee?')) {
      this.props.deleteEmployee(id)
    }
  }

  handleNewEmployee = () => {
    const { url } = this.props.match
    navigateTo(`${url}/new`)
  }

  handleEditEmployee = (id: number) => {
    const { url } = this.props.match
    navigateTo(`${url}/edit/${id}`)
  }

  handleReloadEmployees = () => {
    this.props.fetchEmployees()
  }

  render() {
    const { items: employees, loading } = this.props.employees
    const { url } = this.props.match

    return (
      <div>
        <EmployeesHeading
          loading={loading}
          employees={employees}
          onNewEmployee={this.handleNewEmployee}
          onReloadEmployees={this.handleReloadEmployees}
        />

        <EmployeesList
          loading={loading}
          employees={employees}
          url={url}
          onEditEmployee={this.handleEditEmployee}
          onDeleteEmployee={this.handleDeleteEmployee}
        />
      </div>
    )
  }
}

function mapStateToProps(state: State) {
  return {
    employees: selectEmployees(state)
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    fetchEmployeesIfNeeded: () => dispatch({ type: FETCH_EMPLOYEES_IF_NEEDED }),
    deleteEmployee: (id: number) => dispatch({ type: DELETE_EMPLOYEE, id }),
    fetchEmployees: () => dispatch({ type: FETCH_EMPLOYEES })
  }
}

const connector: Connector<{}, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default connector(EmployeesPage)
