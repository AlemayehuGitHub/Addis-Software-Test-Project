// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import navigateTo from '../../services/navigation'
import { UPDATE_EMPLOYEE } from '../../actionTypes'
import { selectCurrentEmployee } from '../../selectors/employees'
import EmployeeForm from './EmployeeForm'

import type { Connector } from 'react-redux'
import type { State, Dispatch } from '../../types'
import type { Employee, EmployeePayload as Payload } from '../../types/employees'

type Props = {
  employee: Employee,
  updateEmployee(payload: Payload): void
}

type OwnProps = {
  match: {
    params: {
      id: number
    }
  }
}

class EditEmployeePage extends Component<Props> {

  handleSubmit = (payload: Payload) => {
    const { id } = this.props.match.params.id
    payload = { ...payload, id }
    console.log(payload)
    this.props.updateEmployee(payload)
    navigateTo('/')
  }

  render() {
    const { employee } = this.props
  console.log(employee)
    return (
      <div>
        <h2>Edit Employee</h2>
        {<EmployeeForm employee={employee} onSubmit={this.handleSubmit} />}
      </div>
    )
  }
}

function mapStateToProps(state: State, ownProps: OwnProps) {
  const employee = selectCurrentEmployee(state, Number(ownProps.match.params.id))
  return {
    employee
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    updateEmployee: (payload: Payload) => dispatch({ type: UPDATE_EMPLOYEE, payload })
  }
}

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default connector(EditEmployeePage)
