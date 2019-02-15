import React from 'react'
import { storiesOf } from '@storybook/react'
import MessageLine from '.'

storiesOf('MessageLine', module)
  .add('default', () => (
    <MessageLine time="23:12" name="Peter Parker" text="This is some text here" />
  ))
  .add('admin', () => (
    <MessageLine time="23:11" name="Peter Parker 2" text="This is some text here" isAdmin />
  ))
