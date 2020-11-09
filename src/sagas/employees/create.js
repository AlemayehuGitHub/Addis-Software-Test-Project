import { takeLatest, put, call } from 'redux-saga/effects'
import { createtEmployeeInAPI } from '../../services/employees'
import navigateTo from '../../services/navigation'

function* createEmployee(action) {
  yield put({ type: 'CREATE_EMPLOYEE_PENDING' })

  try {
    const newEmployee = yield call(createtEmployeeInAPI, action.payload)
    yield put({ type: 'CREATE_EMPLOYEE_SUCCESS', payload: newEmployee })
    navigateTo('/')
  } catch (error) {
    yield put({ type: 'CREATE_EMPLOYEE_FAILURE' })
    console.error(error) //
    yield put(navigateTo('/error'))
  }
}

export default function* watchCreateEmployee() {
  yield takeLatest('CREATE_EMPLOYEE', createEmployee)
}
