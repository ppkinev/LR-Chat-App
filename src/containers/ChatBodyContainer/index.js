/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ChatBody, PinnedBubbleIcon } from 'components'

import { signalRSend } from 'store/actions'
import { fromSignalr } from 'store/selectors'

const buildPinnedIcons = (mes) => {
  const { id, image, amountPlaced, unpinned } = mes
  if (unpinned) return null
  return <PinnedBubbleIcon key={`icon-${id}`} image={image} amountPlaced={amountPlaced} />
}

class ChatBodyContainer extends Component {
  constructor(props) {
    super(props)

    this.onMessageInput = this.onMessageInput.bind(this)
    this.onSendMessage = this.onSendMessage.bind(this)
  }

  state = {
    messageValue: '',
    showPayment: false,
  }

  componentDidUpdate(prevProps) {
    // Scrolling to the chat bottom
    // if a new message arrived
    if (this.props.messages.length > prevProps.messages.length) {
      this.chatBottom.scrollIntoView({ behavior: 'smooth' })
    }
  }

  onMessageInput(ev) {
    this.setState({ messageValue: ev.currentTarget.value })
  }

  onSendMessage(ev) {
    if (ev) ev.preventDefault()
    const { messageValue: text } = this.state
    if (text.length > 0) {
      this.props.sendMessage({ text })
      this.setState({ messageValue: '' })
    }
  }

  render() {
    const {
      onOpenPayment,
      onHidePayment,
      onChatCollapseToggle,
      isChatCollapsed,
      isOverlayed,
      isWithVideo,
      messages,
      pinnedForm,
      chatMessages,
      isChatReady,
    } = this.props
    const { messageValue } = this.state

    const pinnedIcons = messages.filter(mes => mes.isPinned && !mes.unpinned)
      .map(mes => buildPinnedIcons(mes))

    const chatBottom = (el) => {
      this.chatBottom = el
    }

    return (
      <ChatBody
        isChatReady={isChatReady}
        collapsed={isChatCollapsed}
        isOverlayed={isOverlayed}
        isWithVideo={isWithVideo}
        onHeaderClick={onChatCollapseToggle}
        messageValue={messageValue}
        onMessageInput={this.onMessageInput}
        onSendMessage={this.onSendMessage}
        onOpenPayment={onOpenPayment}
        onHidePayment={onHidePayment}

        pinnedBubbleIcons={pinnedIcons}
        messages={chatMessages}
        pinnedForm={pinnedForm}

        chatBottom={chatBottom}
      />
    )
  }
}

ChatBodyContainer.propTypes = {
  isOverlayed: PropTypes.bool,
  isChatCollapsed: PropTypes.bool,
  isWithVideo: PropTypes.bool,
  onOpenPayment: PropTypes.func,
  onHidePayment: PropTypes.func,
  onChatCollapseToggle: PropTypes.func,

  sendMessage: PropTypes.func,
  messages: PropTypes.array,
  pinnedForm: PropTypes.node,
  chatMessages: PropTypes.array,
  isChatReady: PropTypes.bool,
}

const mapStateToProps = state => ({
  isChatReady: fromSignalr.isReady(state),
})

const mapDispatchToProps = dispatch => ({
  sendMessage: message => dispatch(signalRSend(message)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatBodyContainer)
