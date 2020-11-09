// @flow

export type Employee = {
  +employee_id: number,
  +employee_gender: string,
  +employee_dofb: string,
  +employee_name: string,
  +employee_salary: number
}

export type EmployeePayload = $Diff<Employee, { employee_id: number }>

export type Employees = Array<Employee>

export type EmployeesState = {
  +items: Employees,
  +loading: boolean
}

export type EmployeesAction =
  | { type: 'FETCH_EMPLOYEES' }
  | { type: 'FETCH_EMPLOYEES_IF_NEEDED' }
  | { type: 'FETCH_EMPLOYEES_PENDING' }
  | { type: 'FETCH_EMPLOYEES_SUCCESS', payload: Employees }
  | { type: 'FETCH_EMPLOYEES_FAILURE' }
  | { type: 'DELETE_EMPLOYEE' }
  | { type: 'DELETE_EMPLOYEE_PENDING', id: number }
  | { type: 'DELETE_EMPLOYEE_SUCCESS', id: number }
  | { type: 'DELETE_EMPLOYEE_FAILURE' }
  | { type: 'CREATE_EMPLOYEE', payload: Employee }
  | { type: 'CREATE_EMPLOYEE_PENDING' }
  | { type: 'CREATE_EMPLOYEE_SUCCESS', payload: Employee }
  | { type: 'CREATE_EMPLOYEE_FAILURE' }
  | { type: 'UPDATE_EMPLOYEE', payload: Employee }
  | { type: 'UPDATE_EMPLOYEE_PENDING' }
  | { type: 'UPDATE_EMPLOYEE_SUCCESS', payload: Employee }
  | { type: 'UPDATE_EMPLOYEE_FAILURE' }
