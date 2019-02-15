import React from 'react'
import { storiesOf } from '@storybook/react'
import Fetching from '.'

storiesOf('Fetching', module)
  .add('default', () => (<Fetching />))
