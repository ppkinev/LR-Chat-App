import React from 'react'
import { storiesOf } from '@storybook/react'
import { PinnedBubbleIcon } from 'components'
import ChatHeader from '.'

const icons = [
  <PinnedBubbleIcon key="1" amountPlaced={125} />,
  <PinnedBubbleIcon key="2" amountPlaced={45} />,
  <PinnedBubbleIcon key="3" amountPlaced={35} />,
  <PinnedBubbleIcon key="4" amountPlaced={125} />,
  <PinnedBubbleIcon key="5" amountPlaced={45} />,
  <PinnedBubbleIcon key="6" amountPlaced={35} />,
]

storiesOf('ChatHeader', module)
  .add('default', () => (<ChatHeader />))
  .add('with icons', () => (<ChatHeader pinnedBubbleIcons={icons} />))
