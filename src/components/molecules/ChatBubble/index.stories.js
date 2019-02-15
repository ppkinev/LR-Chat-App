import React from 'react'
import { storiesOf } from '@storybook/react'
import ChatBubble from '.'

storiesOf('ChatBubble', module)
  .add('default', () => (
    <ChatBubble
      text="This is a message"
      amountPlaced={55}
      name="Peter Parker"
      level={1}
    />
  ))
