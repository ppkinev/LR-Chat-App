import React from 'react'
import { storiesOf } from '@storybook/react'
import SignUpForm from '.'

storiesOf('SignUpForm', module)
  .add('default', () => (<SignUpForm />))
