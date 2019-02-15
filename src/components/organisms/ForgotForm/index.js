import React from 'react'
import PropTypes from 'prop-types'
import { FormWrapper, FormInputSet, ButtonWide, FormFooter, TextLink, FormError } from 'components'

const ForgotForm = (props) => {
  const {
    emailValue, onEmailChange, emailError,
    onSubmit, onSignUpClick, onSignInClick,
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

      <ButtonWide main submit onClick={onSubmit}>Send a new password</ButtonWide>
      <FormFooter>
        <TextLink onClick={onSignUpClick}>Sign Up</TextLink>
        <TextLink onClick={onSignInClick}>Sign In</TextLink>
      </FormFooter>
    </FormWrapper>
  )
}

ForgotForm.propTypes = {
  generalError: PropTypes.string,

  emailValue: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  emailError: PropTypes.string,

  onSubmit: PropTypes.func.isRequired,
  onSignUpClick: PropTypes.func,
  onSignInClick: PropTypes.func,
}

export default ForgotForm
