// @flow

import type { Employee, Employees } from '../types/employees'

import service from './Api'

export function fetchEmployeesFromApi(): Promise<Employee> | Promise<Employees> {
  return service.get('http://localhost:4000/employee/')
}

export function deleteEmployeeFromApi(id: number): Promise<number> {
  return service.delete(`${id}`)
}

export function createtEmployeeInAPI(payload: Employee): Promise<Employee> {
  return service.post('http://localhost:4000/employee/add', payload)
}

export function updateEmployeeInAPI(payload: Employee): Promise<Employee> {
  const { id, ...rest } = payload

  return service.patch(`${id}`, rest)
}
