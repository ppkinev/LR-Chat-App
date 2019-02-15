import React from 'react'
import { storiesOf } from '@storybook/react'
import { PinnedBubbleIcon, MessageLine } from 'components'
import ChatBubble from '../../molecules/ChatBubble'
import ChatBody from '.'

const icons = [
  <PinnedBubbleIcon key="a1" amountPlaced={35} />,
  <PinnedBubbleIcon key="a2" amountPlaced={75} />,
  <PinnedBubbleIcon key="a3" amountPlaced={125} />,
]

const messages = [
  <MessageLine key="b1" time="23:12" name="Peter Parker" text="This is some text here" />,
  <MessageLine key="b2" time="23:11" name="Peter Parker 2" text="This is some text here" isAdmin />,
  <MessageLine key="b3" time="23:12" name="Peter Parker" text="This is some text here" />,
  <ChatBubble
    key="b4"
    text="This is a message"
    amountPlaced={25}
    name="Peter Parker"
    level={1}
  />,
  <MessageLine key="b5" time="23:12" name="Peter Parker" text="This is some text here" />,
  <ChatBubble
    key="b6"
    text="This is a message"
    amountPlaced={70}
    name="Peter Parker"
    level={2}
  />,
  <MessageLine key="b7" time="23:12" name="Peter Parker" text="This is some text here" />,
  <MessageLine key="b8" time="23:11" name="Peter Parker 2" text="This is some text here" isAdmin />,
  <MessageLine key="b9" time="23:12" name="Peter Parker" text="This is some text here" />,
  <MessageLine key="b10" time="23:12" name="Peter Parker" text="This is some text here" />,
  <MessageLine key="b11" time="23:11" name="Peter Parker 2" text="This is some text here" isAdmin />,
  <MessageLine key="b12" time="23:12" name="Peter Parker" text="This is some text here" />,
  <ChatBubble
    key="b13"
    text="This is a message"
    amountPlaced={25}
    name="Peter Parker"
    level={1}
  />,
  <MessageLine key="b14" time="23:12" name="Peter Parker" text="This is some text here" />,
  <ChatBubble
    key="b15"
    text="This is a message"
    amountPlaced={70}
    name="Peter Parker"
    level={2}
  />,
]

storiesOf('ChatBody', module)
  .add('default', () => (
    <ChatBody
      pinnedBubbleIcons={icons}
      messages={messages}
    />
  ))
