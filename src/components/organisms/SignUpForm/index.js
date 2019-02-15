import React from 'react'
import PropTypes from 'prop-types'
import { FormWrapper, FormInputSet, ButtonWide, FormFooter, TextLink, FormError } from 'components'

const SignUpForm = (props) => {
  const {
    nameValue, onNameChange, nameError,
    emailValue, onEmailChange, emailError,
    passwordValue, onPasswordChange, passwordError,
    onSubmit, onFB, onSignInClick,
    generalError
  } = props

  return (
    <FormWrapper onSubmit={onSubmit}>
      {generalError && (<FormError>{generalError}</FormError>)}
      <FormInputSet
        type="text"
        label="Your name:"
        placeholder="Enter your name"
        value={nameValue}
        onChange={onNameChange}
        error={nameError}
      />
      <FormInputSet
        type="email"
        label="Your email:"
        placeholder="Enter your@email"
        value={emailValue}
        onChange={onEmailChange}
        error={emailError}
      />
      <FormInputSet
        type="password"
        label="Your password:"
        placeholder="Enter your password"
        value={passwordValue}
        onChange={onPasswordChange}
        error={passwordError}
      />
      <ButtonWide submit main onClick={onSubmit}>Sign in with email</ButtonWide>
      <ButtonWide fb onClick={onFB}>Sign in with FACEBOOK</ButtonWide>
      <FormFooter>
        <TextLink onClick={onSignInClick}>Already a member?</TextLink>
      </FormFooter>
    </FormWrapper>
  )
}

SignUpForm.propTypes = {
  generalError: PropTypes.string,

  nameValue: PropTypes.string.isRequired,
  onNameChange: PropTypes.func.isRequired,
  nameError: PropTypes.string,

  emailValue: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  emailError: PropTypes.string,

  passwordValue: PropTypes.string.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  passwordError: PropTypes.string,

  onFB: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSignInClick: PropTypes.func,
}

export default SignUpForm
