// @flow

import React, { Component } from 'react'

import type { Employee } from '../../types/employees'

import styled from 'styled-components'

type Props = {
  employee?: Employee,
  onSubmit: (payload: { employee_gender: string, employee_dofb: string, employee_name: string, employee_salary: number }) => void
}

type State = {
  employee_gender: string,
  employee_name: string,
  employee_dofb: string,
  employee_salary: number,
  error: string
}

export default class EmployeeForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    // this is a controlled form, so
    let employee_gender = ''
    let employee_dofb = ''
    let employee_name = ''
    let employee_salary = ''

    this.props.employee && ({ employee_gender, employee_dofb, employee_name, employee_salary } = this.props.employee)

    this.state = {
      employee_gender,
      employee_name,
      employee_salary,
      employee_dofb,
      error: ''
    }
  }

  // Handles input form changes made
  handleGenderChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const employee_gender = e.currentTarget.value
    console.log(employee_gender)
    this.setState(() => ({ employee_gender }))
  }

  handleDofbChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const employee_dofb = e.currentTarget.value
    this.setState(() => ({ employee_dofb }))
  }

  handleNameChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const employee_name = e.currentTarget.value
    this.setState(() => ({ employee_name }))
  }

  handleSalaryChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const employee_salary = e.currentTarget.value
    this.setState(() => ({ employee_salary }))
  }

  // Just some simple validations
  handleSubmit = (e: SyntheticEvent<*>) => {
    e.preventDefault()

    let { employee_gender, employee_dofb, employee_name, employee_salary } = this.state
    employee_gender = employee_gender.trim()
    employee_name = employee_name.trim()

    if (!employee_name) {
      this.setState(() => ({
        error: 'Please provide employee name.'
      }))
      return
    }

    if (!employee_gender) {
      this.setState(() => ({
        error: 'Please provide employee gender.'
      }))
      return
    }

    if (!employee_dofb) {
      this.setState(() => ({
        error: 'Please provide employee date of birth.'
      }))
      return
    }

    if (!employee_salary) {
      this.setState(() => ({
        error: 'Please provide employee salary.'
      }))
      return
    }

    const limit = 30
    if (employee_name.length > limit) {
      this.setState(() => ({
        error: `Body is too long (max. ${limit} characters)`
      }))
      return
    }


    this.setState(() => ({ error: '' }))
    this.props.onSubmit({ employee_gender, employee_dofb, employee_name, employee_salary })
  }

  render() {
    const { employee_gender, employee_dofb, employee_name, employee_salary, error } = this.state

    // styled-components implementation
    const StyledForm = styled.div`
      width:100%;
      padding: 10px 10px 10px 10px;
      input,select {
        display: block;
        color: #555;
        background-color: #fff;
        background-image: none;
        border: 1px solid #ccc;
        border-radius: 4px;
        height: 30px;
        width:50%;
        padding: 5px 10px;
        margin: 10px 0px;
        font-size: 12px;
        line-height: 1.5;
        border-radius: 3px;
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
        color: #fff;
        width: 100px;
        background-color: #333;
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#e6e6e6', GradientType=0);
        padding: 5px 14px 6px;
        text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);
        font-size: 13px;
        line-height: normal;
        border: 1px solid #ccc;
        border-bottom-color: #bbb;
      }
      .form-error {
        color: #f11;
      }
    `

    return (
      <StyledForm>
        {error && <div className="form-error">{error}</div>}

        <form className="form" onSubmit={this.handleSubmit}>
          
          <div className="field field-text">
            <label htmlFor="employee_name">
              Full Name:
              <input
                type="text"
                id="employee_name"
                value={employee_name}
                onChange={this.handleNameChange}
              />
            </label>
          </div>


          <div className="field field-text">
            <label htmlFor="employee_gender">
              Gender:
              <select onChange={this.handleGenderChange}>
                <option id="other" value="Other">Other</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>
          </div>

          <div className="field field-text">
            <label htmlFor="employee_dofb">
              Date of Birth:
              <input
                type="date"
                id="employee_dofb"
                value={employee_dofb}
                onChange={this.handleDofbChange}
              />
            </label>
          </div>

          <div className="field field-text">
            <label htmlFor="employee_salary">
              Salary:
              <input
                type="text"
                id="employee_salary"
                value={employee_salary}
                onChange={this.handleSalaryChange}
              />
            </label>
          </div>

          <button className="btn">Save</button>
        </form>
      </StyledForm>
    )
  }
}
