import React from 'react'
import { storiesOf } from '@storybook/react'
import PinnedBubbleIcon from '.'

storiesOf('PinnedBubbleIcon', module)
  .add('0', () => (<PinnedBubbleIcon amountPlaced={35} />))
  .add('1', () => (<PinnedBubbleIcon amountPlaced={75} />))
  .add('2', () => (<PinnedBubbleIcon amountPlaced={125} />))
