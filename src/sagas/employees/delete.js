import { takeLatest, put, call } from 'redux-saga/effects'
import { deleteEmployeeFromApi } from '../../services/employees'
import navigateTo from '../../services/navigation'

function* deleteEmployee(action) {
  yield put({ type: 'DELETE_EMPLOYEE_PENDING', id: action.id })

  try {
    const { count } = yield call(deleteEmployeeFromApi, action.id)
    if (count !== 1) throw new Error('API delete request failed')
    yield put({ type: 'DELETE_EMPLOYEE_SUCCESS', id: action.id })
  } catch (error) {
    yield put({ type: 'DELETE_EMPLOYEE_FAILURE' })
    console.error(error) // eslint-disable-line
    yield put(navigateTo('/error'))
  }
}

export default function* watchDeleteEmployee() {
  yield takeLatest('DELETE_EMPLOYEE', deleteEmployee)
}
