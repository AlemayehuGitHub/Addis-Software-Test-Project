// @flow
import type { State } from '../types'
import type { EmployeesState, Employees, Employee } from '../types/employees'

export function selectEmployees(state: State): EmployeesState {
  return state.entities.employees
}

export function selectCurrentEmployee(state: State, id: number): Employee | void {
  const items: Employees = state.entities.employees.items
  return items.find(item => item.id === id)
}
