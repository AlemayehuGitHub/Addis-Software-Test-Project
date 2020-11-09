// @flow

import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux'
import type { EmployeesState, EmployeesAction } from './employees'

export type ReduxInitAction = { type: '@@INIT' }
export type Action = ReduxInitAction | EmployeesAction

export type State = {
  entities: {
    employees: EmployeesState
  }
}

export type Store = ReduxStore<State, Action>
export type Dispatch = ReduxDispatch<Action>
