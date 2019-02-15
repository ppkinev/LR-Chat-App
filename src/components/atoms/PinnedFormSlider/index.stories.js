import React from 'react'
import { storiesOf } from '@storybook/react'
import PinnedFormSlider from '.'

storiesOf('PinnedFormSlider', module)
  .add('default', () => (<PinnedFormSlider max={200} />))
