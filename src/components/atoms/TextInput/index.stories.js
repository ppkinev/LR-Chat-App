import React from 'react'
import { storiesOf } from '@storybook/react'
import TextInput from '.'

storiesOf('TextInput', module)
  .add('default', () => (<TextInput />))
  .add('with placeholder', () => (<TextInput placeholder={'Put your name here'} />))
