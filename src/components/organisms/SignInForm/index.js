import React from 'react'
import PropTypes from 'prop-types'
import { FormWrapper, FormInputSet, ButtonWide, FormFooter, TextLink, FormError } from 'components'

const SignInForm = (props) => {
  const {
    emailValue, onEmailChange, emailError,
    passwordValue, onPasswordChange, passwordError,
    onSubmit, onFB, onForgotClick, onSignUpClick,
    generalError,
  } = props

  return (
    <FormWrapper onSubmit={onSubmit}>
      {generalError && (<FormError>{generalError}</FormError>)}
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
        <TextLink onClick={onSignUpClick}>Not a member?</TextLink>
        <TextLink onClick={onForgotClick}>Forgot password?</TextLink>
      </FormFooter>
    </FormWrapper>
  )
}

SignInForm.propTypes = {
  generalError: PropTypes.string,

  emailValue: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  emailError: PropTypes.string,

  passwordValue: PropTypes.string.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  passwordError: PropTypes.string,

  onFB: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onForgotClick: PropTypes.func,
  onSignUpClick: PropTypes.func,
}

export default SignInForm
