import React from 'react'
import { storiesOf } from '@storybook/react'
import MessageFormWrapper from '.'

storiesOf('MessageForm', module)
  .add('default', () => (
    <MessageFormWrapper
      onOpenPayment={() => window.console.info('Open payment')}
      onSendMessage={() => window.console.info('Send message')}
    />
  ))
