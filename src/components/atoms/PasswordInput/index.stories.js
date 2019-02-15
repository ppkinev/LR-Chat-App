import React from 'react'
import { storiesOf } from '@storybook/react'
import PasswordInput from '.'

storiesOf('PasswordInput', module)
  .add('default', () => (<PasswordInput />))
