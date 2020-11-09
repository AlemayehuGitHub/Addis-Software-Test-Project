// @flow

import type { EmployeesState as State, EmployeesAction as Action } from '../types/employees'

function employees(
  state: State = { items: [], loading: false },
  action: Action
): State {
  switch (action.type) {
    case 'FETCH_EMPLOYEES_PENDING':
    case 'DELETE_EMPLOYEE_PENDING':
    case 'CREATE_EMPLOYEE_PENDING':
    case 'UPDATE_EMPLOYEE_PENDING':
      return {
        ...state,
        loading: true
      }
    case 'FETCH_EMPLOYEES_SUCCESS':
      return {
        items: action.payload.reverse(),
        loading: false
      }
    case 'FETCH_EMPLOYEES_FAILURE':
      return {
        items: [],
        loading: false
      }
    case 'DELETE_EMPLOYEE_SUCCESS': {
      const employee_id = action.id
      return {
        items: state.items.filter(employee => employee._id !== employee_id),
        loading: false
      }
    }
    case 'CREATE_EMPLOYEE_SUCCESS':
      return {
        items: [action.payload].concat(state.items),
        loading: false
      }
    case 'UPDATE_EMPLOYEE_SUCCESS': {
      const { id, ...rest } = action.payload

      return {
        items: state.items.map(employee => {
          if (employee.id === id) {
            return { ...employee, ...rest }
          }
          return employee
        }),
        loading: false
      }
    }
    case 'CREATE_EMPLOYEE_FAILURE':
    case 'DELETE_EMPLOYEE_FAILURE':
    case 'UPDATE_EMPLOYEE_FAILURE':
      return {
        ...state,
        loading: false
      }
    default:
      return state
    }
}

export default employees
