import { takeLatest, put, call } from 'redux-saga/effects'
import { updateEmployeeInAPI } from '../../services/employees'
import navigateTo from '../../services/navigation'

function* updateEmployee(action) {
  yield put({ type: 'UPDATE_EMPLOYEE_PENDING' })

  try {
    const updatedEmployee = yield call(updateEmployeeInAPI, action.payload)
    yield put({ type: 'UPDATE_EMPLOYEE_SUCCESS', payload: updatedEmployee })
    navigateTo('/admin/employees')
  } catch (error) {
    yield put({ type: 'UPDATE_EMPLOYEE_FAILURE' })
    console.error(error) // eslint-disable-line
    yield put(navigateTo('/error'))
  }
}

export default function* watchUpdateEmployee() {
  yield takeLatest('UPDATE_EMPLOYEE', updateEmployee)
}
