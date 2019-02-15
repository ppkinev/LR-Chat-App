import React from 'react'
import { storiesOf } from '@storybook/react'
import PinnedFormConfirm from '.'

storiesOf('PinnedFormConfirm', module)
  .add('default', () => (
    <PinnedFormConfirm
      onConfirm={() => window.console.info('onConfirm')}
      onCancel={() => window.console.info('onCancel')}
    />
  ))
