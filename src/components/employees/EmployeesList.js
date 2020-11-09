// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import type { Employees } from '../../types/employees'

type Props = {
  loading: boolean,
  employees: Employees,
  url: string,
  onEditEmployee: (id: number) => void,
  onDeleteEmployee: (id: number) => void
}

export default function EmployeesList(props: Props) {
  
  const { loading, employees, url, onEditEmployee, onDeleteEmployee } = props

  const TableResponsive = styled.div`
    .table-responsive {
      width: 100%;
      margin-bottom: 15px;
      overflow-y: hidden;
      -ms-overflow-style: -ms-autohiding-scrollbar;
      border: 1px solid #ddd;
    }
    .table-striped > tbody > tr:nth-of-type(odd) {
      background-color: #f9f9f9;
    }

    .table-responsive > thead > tr > th,
    .table-responsive > tbody > tr > td {
      white-space: nowrap;
      border: 1px solid #ddd !important;
    }
    
    .employees_title {
      display: block;
      padding: 10px 12px;
      border: 1px solid #ddd !important;
      color: #333;
      under
    }

    button {
        display: inline-block;
        padding: 6px 12px;
        margin-bottom: 0;
        font-size: 14px;
        font-weight: normal;
        line-height: 1.42857143;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        cursor: pointer;
        width: 100px;
        color: #fff;
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#e6e6e6', GradientType=0);
        padding: 5px 14px 6px;
        text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);
        font-size: 13px;
        line-height: normal;
        border: 1px solid #ccc;
        border-bottom-color: #bbb;
      }
      .btn-primary {
        background-color: #33f;
      }
      .btn-danger {
        background-color: #f11;
      }
  ` 


  if (loading) return <p>Loading...</p>
  if (employees.length === 0) return <div>No employees.</div>

  return (
    <TableResponsive>
      <table className="table table-responsive table-striped" style={{ marginTop: 20 }} >
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => ( 
            <tr className="employees__item" key={employee.id}>
              <Link className="employees_title" to={`${url}/${employee._id}`}>
                {employee.employee_name}
              </Link>
              <td> {employee.employee_gender}</td>
              <td> {employee.employee_dofb}</td>
              <td> {employee.employee_salary}</td>
              <td>
                <button
                  className="btn-primary"
                  onClick={() => onEditEmployee(employee._id)}
                  title="Edit"
                >
                  Edit<i className="fa fa-pencil-square-o" />
                </button>
                <button
                  className="btn-danger"
                  onClick={() => onDeleteEmployee(employee._id)}
                  title="Delete"
                >
                  Delete<i className="fa fa-trash-o" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableResponsive>
  )
}
