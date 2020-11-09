import { all } from 'redux-saga/effects'
import { watchFetchEmployeesIfNeeded, watchFetchEmployees } from './employees/fetch'
import watchDeleteEmployee from './employees/delete'
import watchCreateEmployee from './employees/create'
import watchUpdateEmployee from './employees/update'

export default function* rootSaga() {
  yield all([
    watchFetchEmployeesIfNeeded(),
    watchFetchEmployees(),
    watchDeleteEmployee(),
    watchCreateEmployee(),
    watchUpdateEmployee()
  ])
}
