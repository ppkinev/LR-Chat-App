/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { PageMiddleContent, SignInForm, SignUpForm, ForgotForm } from 'components'
import { postSignInRequest, postSignUpRequest, postForgotRequest, connectFBOpen, clearLoginErrors } from 'store/actions'
import { fromApp, fromProfile } from 'store/selectors'

import { xdmTunnel } from '../../config'
import { isSafari } from '../../services/helpers'

const SIGN_IN = 'signIn'
const SIGN_UP = 'signUp'
const FORGOT = 'forgot'

const getFormType = (type) => {
  switch (type) {
    case SIGN_UP:
      return SignUpForm
    case FORGOT:
      return ForgotForm
    default:
      return SignInForm
  }
}

const setSafariCookie = (foundationUrl, callback) => {
  const url = `${xdmTunnel}?safarifix&authpoint=${window.encodeURIComponent(window.btoa(`${foundationUrl}sso/tunnel?safarifix`))}`
  const settings = 'menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=1,height=1,top=0,left=0'
  const w = window.open(url, '_blank', settings)
  const interval = window.setInterval(() => {
    if (w.closed) {
      window.clearInterval(interval)
      if (callback) callback()
    }
  }, 50)
}

class LoginFlowContainer extends Component {
  constructor(props) {
    super(props)

    this.changeFormType = this.changeFormType.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
    this.onEmailChange = this.onEmailChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  state = {
    email: '',
    password: '',
    name: '',
    type: SIGN_IN,
  }

  onNameChange(ev) {
    this.setState({ name: ev.currentTarget.value })
  }

  onEmailChange(ev) {
    this.setState({ email: ev.currentTarget.value })
  }

  onPasswordChange(ev) {
    this.setState({ password: ev.currentTarget.value })
  }

  onFormSubmit(ev) {
    if (ev) ev.preventDefault()
    const { foundationUrl, clearError } = this.props
    clearError()

    if (isSafari()) {
      setSafariCookie(foundationUrl, () => {
        this.onFinalSubmit()
      })
    } else {
      this.onFinalSubmit()
    }
  }

  onFinalSubmit() {
    const { signInRequest, signUpRequest, passwordForgotRequest } = this.props
    const { type, email, name, password } = this.state
    switch (type) {
      case FORGOT:
        passwordForgotRequest({ email })
        break
      case SIGN_UP:
        signUpRequest({
          email, password, name,
        })
        break
      default:
        signInRequest({
          email, password,
        })
    }
  }

  changeFormType(type) {
    this.props.clearError()
    this.setState({ type })
  }

  render() {
    const { email, password, name, type } = this.state
    const { fbConnect, loginError } = this.props
    const LoginForm = getFormType(type)

    const onSignInClick = () => this.changeFormType(SIGN_IN)
    const onSignUpClick = () => this.changeFormType(SIGN_UP)
    const onForgotClick = () => this.changeFormType(FORGOT)

    const generalError = !loginError.fields ? loginError.message : null
    const nameError = loginError.fields && loginError.fields.username
    const emailError = loginError.fields && loginError.fields.email
    const passwordError = loginError.fields && loginError.fields.password

    return (
      <PageMiddleContent>
        <LoginForm
          nameValue={name}
          emailValue={email}
          passwordValue={password}

          onNameChange={this.onNameChange}
          onEmailChange={this.onEmailChange}
          onPasswordChange={this.onPasswordChange}

          onSubmit={this.onFormSubmit}
          onFB={fbConnect}

          nameError={nameError}
          emailError={emailError}
          passwordError={passwordError}
          generalError={generalError}

          onSignInClick={onSignInClick}
          onSignUpClick={onSignUpClick}
          onForgotClick={onForgotClick}
        />
      </PageMiddleContent>
    )
  }
}

LoginFlowContainer.propTypes = {
  signInRequest: PropTypes.func.isRequired,
  signUpRequest: PropTypes.func.isRequired,
  passwordForgotRequest: PropTypes.func.isRequired,
  fbConnect: PropTypes.func.isRequired,
  foundationUrl: PropTypes.string,

  loginError: PropTypes.object,
  clearError: PropTypes.func,
}

const mapStateToProps = state => ({
  foundationUrl: fromApp.getFoundationUrl(state),
  loginError: fromProfile.getError(state),
})

const mapDispatchToProps = dispatch => ({
  signInRequest: credentials => dispatch(postSignInRequest(credentials)),
  signUpRequest: credentials => dispatch(postSignUpRequest(credentials)),
  passwordForgotRequest: () => dispatch(postForgotRequest()),
  fbConnect: () => dispatch(connectFBOpen()),
  clearError: () => dispatch(clearLoginErrors()),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginFlowContainer)
