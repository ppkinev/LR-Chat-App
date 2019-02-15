import React from 'react'
import { storiesOf } from '@storybook/react'
import AvatarCircular from '.'

storiesOf('AvatarCircular', module)
  .add('default', () => (<AvatarCircular />))
  .add('big', () => (<AvatarCircular big />))
  .add('small', () => (<AvatarCircular small />))
