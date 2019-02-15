import React from 'react'
import { storiesOf } from '@storybook/react'
import PinnedFormOpened from '.'

storiesOf('PinnedFormOpened', module)
  .add('default', () => (
    <PinnedFormOpened
      name="Peter Parker"
      userPoints={50}
      inputValue="23"
      maxLength={300}
      amountPlaced={22}
    />
  ))
