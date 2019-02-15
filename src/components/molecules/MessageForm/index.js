import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { MessageInput } from 'components'
import { SendBtn, MoneyBtn } from '../../atoms/MessageButtons'
import { slideFromBottom } from '../../themes/keyframes'

const MessageFormWrapper = styled.form`
  position: relative;
  box-shadow: 0 -3px 5px -2px rgba(0,0,0,0.4);
  animation: ${slideFromBottom} 0.3s ease forwards 1;
`

const MessageForm = ({ messageValue, onSendMessage, onOpenPayment, onMessageInput }) => {
  return (
    <MessageFormWrapper onSubmit={onSendMessage}>
      <MessageInput onChange={onMessageInput} value={messageValue} />
      <MoneyBtn onClick={onOpenPayment} />
      <SendBtn onClick={onSendMessage} />
    </MessageFormWrapper>
  )
}

MessageForm.propTypes = {
  messageValue: PropTypes.string,
  onSendMessage: PropTypes.func,
  onOpenPayment: PropTypes.func,
  onMessageInput: PropTypes.func,
}

export default MessageForm
