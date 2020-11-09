// @flow

import { combineReducers } from 'redux'
import employees from './employees'

const entitiesReducer = combineReducers({
  employees
})

const rootReducer = combineReducers({
  entities: entitiesReducer
})

export default rootReducer
