import React from 'react'
import { storiesOf } from '@storybook/react'
import FormInputSet from '.'

storiesOf('FormInputSet', module)
  .add('text', () => (<FormInputSet label={'Your name:'} placeholder={'Enter your name here'} />))
  .add('email', () => (<FormInputSet type="email" label={'Your email:'} placeholder={'@ enter your email here'} />))
