// @flow

import React from 'react'

import type { Employees } from '../../types/employees'

type Props = {
  loading: boolean,
  employees: Employees,
  onNewEmployee: () => void,
  onReloadEmployees: () => void
}

export default function EmployeesHeading({
  loading,
  employees,
  onNewEmployee,
  onReloadEmployees
}: Props) {
  return (
    <div>
      <div className="employees-heading">
        <h2 className="employees-heading__title">Employees</h2>
        <button
          className="btn employees-heading__btn"
          onClick={onNewEmployee}
          disabled={loading}
        >
          New Employee
        </button>
        <button
          className="btn employees-heading__btn"
          onClick={onReloadEmployees}
          disabled={loading || employees.length === 0}
        >
          Reload Employees
        </button>
      </div>
    </div>
  )
}
