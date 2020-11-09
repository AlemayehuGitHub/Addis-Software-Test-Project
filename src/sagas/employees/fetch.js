import { takeLatest, put, call, select } from 'redux-saga/effects'
import { fetchEmployeesFromApi } from '../../services/employees'
import navigateTo from '../../services/navigation'
import { selectEmployees } from '../../selectors/employees'

function* fetchEmployees() {
  yield put({ type: 'FETCH_EMPLOYEES_PENDING' })

  try {
    const employeesFromApi = yield call(fetchEmployeesFromApi)
    yield put({ type: 'FETCH_EMPLOYEES_SUCCESS', payload: employeesFromApi })
  } catch (error) {
    yield put({ type: 'FETCH_EMPLOYEES_FAILURE' })
    console.error(error) // eslint-disable-line
    yield put(navigateTo('/error'))
  }
}

export function* watchFetchEmployees() {
  yield takeLatest('FETCH_EMPLOYEES', fetchEmployees)
}

function* fetchEmployeesIfNeeded() {
  const { items: employees } = yield select(selectEmployees)
  if (employees.length === 0) {
    yield call(fetchEmployees)
  }
}

export function* watchFetchEmployeesIfNeeded() {
  yield takeLatest('FETCH_EMPLOYEES_IF_NEEDED', fetchEmployeesIfNeeded)
}
