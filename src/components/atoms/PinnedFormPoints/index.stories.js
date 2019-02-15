import React from 'react'
import { storiesOf } from '@storybook/react'
import PinnedFormPoints from '.'

storiesOf('PinnedFormPoints', module)
  .add('default', () => (<PinnedFormPoints>{200}</PinnedFormPoints>))
