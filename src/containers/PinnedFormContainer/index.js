/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { PinnedFormOpened, PinnedFormConfirm } from 'components'
import { signalRSend, getMeRequest } from 'store/actions'
import { fromProfile } from 'store/selectors'

class PinnedFormContainer extends Component {
  constructor(props) {
    super(props)
    this.openFullForm = this.openFullForm.bind(this)
    this.closeFullForm = this.closeFullForm.bind(this)
    this.onMessageInput = this.onMessageInput.bind(this)
    this.onAmountChange = this.onAmountChange.bind(this)
    this.onAmountChangeOver = this.onAmountChangeOver.bind(this)
    this.onMessageSend = this.onMessageSend.bind(this)
  }

  state = {
    full: false,
    amountPlaced: 0,
    message: '',
  }

  onMessageInput(ev) {
    this.setState({ message: ev.currentTarget.value })
  }

  onAmountChange(ev) {
    this.setState({ amountPlaced: Number(ev.currentTarget.value) })
  }

  onAmountChangeOver() {
    this.inputFieldRef.focus()
  }

  onMessageSend(ev) {
    if (ev) ev.preventDefault()
    const { sendMessage, onCancel, getMe } = this.props
    const { amountPlaced, message } = this.state
    if (amountPlaced) {
      sendMessage({
        amountPlaced,
        text: message,
      })
      onCancel()
      window.setTimeout(() => {
        getMe()
      }, 1000)
    }
  }

  openFullForm() {
    this.setState({ full: true })
  }

  closeFullForm() {
    this.setState({ full: false })
  }

  render() {
    const { name, level, image, userPoints, onCancel } = this.props
    const { full, amountPlaced, message } = this.state
    return full
      ? <PinnedFormOpened
        name={name}
        level={level}
        image={image}
        userPoints={userPoints}
        amountPlaced={amountPlaced}
        inputValue={message}
        onInputChange={this.onMessageInput}
        inputFieldRef={(input) => { this.inputFieldRef = input }}
        onAmountChangeOver={this.onAmountChangeOver}
        onAmountChange={this.onAmountChange}
        onPinnedMessageSend={this.onMessageSend}
        onBack={this.closeFullForm}
      />
      : <PinnedFormConfirm
        onConfirm={this.openFullForm}
        onCancel={onCancel}
      />
  }
}

PinnedFormContainer.propTypes = {
  name: PropTypes.string,
  level: PropTypes.object,
  image: PropTypes.string,
  userPoints: PropTypes.number,

  onCancel: PropTypes.func,
  sendMessage: PropTypes.func,
  getMe: PropTypes.func,
}

const mapStateToProps = state => ({
  name: fromProfile.getName(state),
  level: fromProfile.getLevel(state),
  image: fromProfile.getImage(state),
  userPoints: fromProfile.getPoints(state),
})

const mapDispatchToProps = dispatch => ({
  sendMessage: message => dispatch(signalRSend(message)),
  getMe: () => dispatch(getMeRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(PinnedFormContainer)
