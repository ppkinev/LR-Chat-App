import React from 'react'
import { storiesOf } from '@storybook/react'
import SignInForm from '.'

storiesOf('SignInForm', module)
  .add('default', () => (<SignInForm />))
