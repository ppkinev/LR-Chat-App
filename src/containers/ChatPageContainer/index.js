/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getMeRequest, signalRMessageConvert } from 'store/actions'
import { fromSignalr, fromProfile } from 'store/selectors'
import { Wrapper, ChatBubble, MessageLine, VideoStream, Fetching } from 'components'

import ChatBodyContainer from '../ChatBodyContainer'
import PinnedFormContainer from '../PinnedFormContainer'
import ConnectFlowContainer from '../ConnectFlowContainer'

import { authData } from '../../config'
import { getPinnedBubbleInfo } from '../../services/helpers'

const isProperMessage = mes => mes.text || (mes.amountPlaced && !mes.unpinned)

class ChatPageContainer extends Component {
  constructor(props) {
    super(props)

    this.onPaymentShow = this.onPaymentShow.bind(this)
    this.onPaymentHide = this.onPaymentHide.bind(this)
    this.onChatCollapseToggle = this.onChatCollapseToggle.bind(this)
    this.handleMessageUpdate = this.handleMessageUpdate.bind(this)
    this.buildChatMessage = this.buildChatMessage.bind(this)

    this.pinnedMessageIds = []
  }

  state = {
    showPayment: false,
    isWithVideo: true,
    chatCollapsed: false,
  }

  componentWillMount() {
    if (authData.userManager) {
      authData.userManager.getUser().then((user) => {
        if (user) this.props.getMe()
      })
    }
  }

  onChatCollapseToggle() {
    this.setState({ chatCollapsed: !this.state.chatCollapsed })
  }

  onPaymentShow() {
    this.setState({ showPayment: true })
  }

  onPaymentHide() {
    this.setState({ showPayment: false })
  }

  getChatMessages() {
    return this.props.messages.filter(mes => isProperMessage(mes))
      .map(mes => this.buildChatMessage(mes))
  }

  getVideoMessages() {
    const MAX_LENGTH = 3
    const messages = this.props.messages.filter(mes => isProperMessage(mes) && !mes.isSystem)
    const slicedMessages = messages.length > MAX_LENGTH ? messages.slice(messages.length - 3) : messages
    return slicedMessages.map(mes => this.buildChatMessage(mes, true))
  }

  handleMessageUpdate(id, time) {
    const ids = this.pinnedMessageIds
    if (!ids.includes(id)) {
      ids.push(id)
      window.setTimeout(() => {
        this.props.convertMessage(id)
      }, time)
    }
  }

  buildChatMessage(mes, isOverVideo) {
    const { name, image, text, receivedAt: time, id, amountPlaced, unpinned, isAdmin, level, isSystem } = mes
    if (amountPlaced && !unpinned) {
      this.handleMessageUpdate(id, getPinnedBubbleInfo(amountPlaced).time * 1000)

      return (
        <ChatBubble
          key={`bubble-${id}`}
          name={name}
          text={text}
          image={image}
          amountPlaced={amountPlaced}
          level={level}
          isOverVideo={isOverVideo}
        />
      )
    }

    return (
      <MessageLine
        key={`line-${id}`}
        name={name}
        text={text}
        time={time}
        image={image}
        isAdmin={isAdmin}
        level={level}
        isSystem={isSystem}
        isOverVideo={isOverVideo}
      />
    )
  }

  render() {
    const { isWithVideo, showPayment, chatCollapsed } = this.state
    const { messages, isAuthorized, isGetMeFetching } = this.props

    if (!isAuthorized && isGetMeFetching) return (<Fetching />)

    const pinnedForm = showPayment && <PinnedFormContainer onCancel={this.onPaymentHide} />
    const chatMessages = this.getChatMessages()
    const videoMessages = this.getVideoMessages()
    const video = isWithVideo ? (
      <VideoStream
        chatCollapsed={chatCollapsed}
        messages={videoMessages}
      />
    ) : null

    return isAuthorized ? (
      <Wrapper>
        {video}
        <ChatBodyContainer
          onOpenPayment={this.onPaymentShow}
          onHidePayment={this.onPaymentHide}
          onChatCollapseToggle={this.onChatCollapseToggle}
          buildChatMessage={this.buildChatMessage}
          isChatCollapsed={chatCollapsed}
          isOverlayed={showPayment}
          isWithVideo={isWithVideo}
          chatMessages={chatMessages}
          messages={messages}
          pinnedForm={pinnedForm}
        />
      </Wrapper>
    ) : (
      <ConnectFlowContainer />
    )
  }
}

ChatPageContainer.propTypes = {
  getMe: PropTypes.func,
  convertMessage: PropTypes.func,
  messages: PropTypes.array,

  isAuthorized: PropTypes.bool,
  isGetMeFetching: PropTypes.bool,
}

const mapStateToProps = state => ({
  messages: fromSignalr.getMessages(state),
  isAuthorized: fromProfile.isAuthorized(state),
  isGetMeFetching: fromProfile.isGetMeFetching(state),
})

const mapDispatchToProps = dispatch => ({
  getMe: () => dispatch(getMeRequest()),
  convertMessage: messageId => dispatch(signalRMessageConvert(messageId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatPageContainer)
