import React from 'react'
import { storiesOf } from '@storybook/react'
import PinnedFormPinInfo from '.'

storiesOf('PinnedFormPinInfo', module)
  .add('0', () => (<PinnedFormPinInfo type={0} />))
  .add('1', () => (<PinnedFormPinInfo type={1} />))
  .add('2', () => (<PinnedFormPinInfo type={2} />))
