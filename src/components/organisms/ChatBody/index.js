import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { palette } from 'styled-theme'
import { ChatHeader, MessageForm } from 'components'
import { fadeIn } from '../../themes/keyframes'

const ChatBodyHolder = styled.div`
  background-color: ${palette('white', 0)};
  position: relative;
  
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  
  min-width: 250px;
  
  transition: height 0.3s ease;
`

const ChatBodyOverlay = styled.div`
  display: ${props => props.isOverlayed ? 'block' : 'none'};
  position: absolute;
  z-index: 15;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0,0,0,0.3);
  animation: ${fadeIn} 0.2s ease forwards 1;
`

const ChatBodyInner = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  padding: 10px;
  display: flex;
  flex-direction: column;
`

const ChatBodyBottomElement = styled.div``

const ChatBody = ({
                    isChatReady,
                    pinnedBubbleIcons,
                    messages,
                    collapsed,
                    isOverlayed,
                    isWithVideo,
                    onHeaderClick,
                    onMessageInput,
                    messageValue,
                    onOpenPayment,
                    onHidePayment,
                    onSendMessage,
                    chatBottom,
                    pinnedForm,
                  }) => {
  const headerClick = isWithVideo ? onHeaderClick : null
  const messageForm = isChatReady ? (
    <MessageForm
      onMessageInput={onMessageInput}
      messageValue={messageValue}
      onOpenPayment={onOpenPayment}
      onSendMessage={onSendMessage}
    />
  ) : null

  return (
    <ChatBodyHolder collapsed={collapsed} isWithVideo={isWithVideo}>
      <ChatHeader
        pinnedBubbleIcons={pinnedBubbleIcons}
        collapsed={collapsed}
        onHeaderClick={headerClick}
      />
      <ChatBodyInner>
        {messages}
        <ChatBodyBottomElement innerRef={chatBottom} />
      </ChatBodyInner>
      {messageForm}
      <ChatBodyOverlay
        onClick={onHidePayment}
        isOverlayed={isOverlayed}
      />
      {pinnedForm}
    </ChatBodyHolder>
  )
}


ChatBody.propTypes = {
  isChatReady: PropTypes.bool,
  pinnedBubbleIcons: PropTypes.array,
  messages: PropTypes.array,
  collapsed: PropTypes.bool,
  isOverlayed: PropTypes.bool,
  isWithVideo: PropTypes.bool,
  messageValue: PropTypes.string,
  onHeaderClick: PropTypes.func,
  onMessageInput: PropTypes.func,
  onOpenPayment: PropTypes.func,
  onHidePayment: PropTypes.func,
  onSendMessage: PropTypes.func,

  pinnedForm: PropTypes.node,
  chatBottom: PropTypes.any,
}

export default ChatBody
