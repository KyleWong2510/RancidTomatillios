import React from 'react';
import Login from './Login';
import { loginCredentials } from './Login'

import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react';

describe('Login', () => {

  it('should be true', () => {
    expect(true).toEqual(true)
  })

  it('should render a message, two inputs, and a button', () => {
    const { 
      getByText, 
      getByPlaceholderText, 
      getByRole 
    } = render(<Login />)

    const message = getByText('Enter login information')
    const emailInput = getByPlaceholderText('Email')
    const passwordInput = getByPlaceholderText('Password')
    const button = getByRole('button')

    expect(message).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  //fire onchange of inputs to test invalid inputs

  it.skip('should run loginCredentials on button click', () => {
    const mockUserFn = jest.fn()
    const mockToggleFn = jest.fn()
    const { getByRole } = render(<Login 
      getCurrentUser={ mockUserFn }
      toggleLoginDisplay={ mockToggleFn }
    />)

    const mockLoginCredentials = jest.fn(mockUserFn, mockToggleFn)

    const button = getByRole('button')
    fireEvent.click(button)

    expect(mockLoginCredentials).toBeCalledTimes(1)
  })
})