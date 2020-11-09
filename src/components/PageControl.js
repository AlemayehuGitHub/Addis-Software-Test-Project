// @flow

import React from 'react'
import { Route, Switch, Redirect, Link } from 'react-router-dom'
import styled from 'styled-components'

import EmployeesPage from './employees/EmployeesPage'
import NewEmployeePage from './employees/NewEmployeePage'
import EditEmployeePage from './employees/EditEmployeePage'
import EmployeePage from './employees/EmployeePage'

type Props = {
  match: {
    url: string
  }
}

export default function PageControl({ match: { url } }: Props) {

  const Header = styled.div `
      background-color: #eee;
      padding: 1rem 0;
      margin-bottom: 20px;

      .header__brand {
        font-size: 4rem;
      }

      .container {
        width: 85rem;
        padding: 0;
        margin: 0 auto;
      }
    `

  return (
    <div>
      <Header className="header">
        <div className="container">
          <Link to="/admin" className="header__brand">
            Employee Portal
          </Link>
        </div>
      </Header>

      <div className="container">
        <Switch>
          <Route
            exact
            path={`${url}`}
            render={() => <Redirect to={`${url}/employees`} />}
          />
          <Route exact path={`${url}/employees`} component={EmployeesPage} />
          <Route exact path={`${url}/employees/new`} component={NewEmployeePage} />
          <Route exact path={`${url}/employees/:id`} component={EmployeePage} />
          <Route
            exact
            path={`${url}/employees/edit/:id/`}
            component={EditEmployeePage}
          />
          <Redirect to="/error" />
        </Switch>
      </div>
    </div>
  )
}
