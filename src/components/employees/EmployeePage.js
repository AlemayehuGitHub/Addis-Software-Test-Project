// @flow

import React from 'react'
import { connect } from 'react-redux'
import { selectCurrentEmployee } from '../../selectors/employees'

import type { Connector } from 'react-redux'
import type { State, Dispatch } from '../../types'
import type { Employee } from '../../types/employees'

type Props = {
  employee: Employee
}

type OwnProps = {
  match: {
    params: {
      id: number
    }
  }
}

function EmployeePage({ employee }: Props) {
  return (
    <div>
      <h2>Employee Detail</h2>
      {employee && (
        <div>
          <h2>{employee.employee_gender}</h2>
          <div>{employee.employee_name}</div>
        </div>
      )}
    </div>
  )
}

function mapStateToProps(state: State, ownProps: OwnProps) {
  const employee = selectCurrentEmployee(state, Number(ownProps.match.params.id))
  return {
    employee
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {}
}

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default connector(EmployeePage)
