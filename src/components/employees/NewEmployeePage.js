// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import navigateTo from '../../services/navigation'
import { CREATE_EMPLOYEE } from '../../actionTypes'
import EmployeeForm from './EmployeeForm'

import type { Connector } from 'react-redux'
import type { Dispatch } from '../../types'
import type { EmployeePayload as Payload } from '../../types/employees'

type Props = {
  dispatch: Dispatch,
  createEmployee(payload: Payload): void
}

class NewEmployeePage extends Component<Props> {
  handleSubmit = (payload: Payload) => {
    this.props.createEmployee(payload)
    navigateTo('/admin/employees')
  }

  render() {
    return (
      <div>
        <h2>Create new employee</h2>
        <EmployeeForm onSubmit={this.handleSubmit} />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    createEmployee: (payload: Payload) => dispatch({ type: CREATE_EMPLOYEE, payload })
  }
}

const connector: Connector<{}, Props> = connect(null, mapDispatchToProps)
export default connector(NewEmployeePage)
