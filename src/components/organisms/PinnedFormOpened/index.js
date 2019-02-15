import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { palette, size } from 'styled-theme'
import {
  PinnedFormSlider,
  PinnedFormPoints,
  PinnedFormPinInfo,
  PinnedFormCharInfo,
  PinnedFormButton,
  PinnedFormHeader,
} from 'components'

// For some reason it doesn't work via 'components' above
import ChatBubble from '../../molecules/ChatBubble'

import { slideFromBottom } from '../../themes/keyframes'

const PinnedFormOpenedHolder = styled.div`
  position: absolute;
  z-index: 25;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${palette('white', 0)};
  box-sizing: border-box;
  padding: 0 10px 10px;
  animation: ${slideFromBottom} 0.3s ease forwards 1;
  
  @media all and ${size('mobile')} {
    padding: 0 30px 10px;
  }
`

const PinnedFormOpenedTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 0;
`

const PinnedFormOpened = ({
                            amountPlaced,
                            level,
                            name,
                            image,
                            inputValue,
                            onInputChange,
                            inputFieldRef,
                            onAmountChange,
                            onAmountChangeOver,
                            onPinnedMessageSend,
                            userPoints,
                            onBack,
                          }) => {
  return (
    <PinnedFormOpenedHolder>
      <PinnedFormHeader onBack={onBack} />
      <PinnedFormOpenedTop>
        <PinnedFormPinInfo amountPlaced={amountPlaced} />
        <PinnedFormCharInfo length={inputValue.length} amountPlaced={amountPlaced} />
      </PinnedFormOpenedTop>
      <ChatBubble
        amountPlaced={amountPlaced}
        level={level}
        name={name}
        image={image}
        inputValue={inputValue}
        inputOnChange={onInputChange}
        inputFieldRef={inputFieldRef}
        onPinnedMessageSend={onPinnedMessageSend}
        isInput
      />
      <PinnedFormPoints>{amountPlaced}</PinnedFormPoints>
      <PinnedFormSlider value={amountPlaced} onChange={onAmountChange} onMouseUp={onAmountChangeOver} onTouchEnd={onAmountChangeOver} max={userPoints} />
      <PinnedFormButton onClick={onPinnedMessageSend}>Send pinned message</PinnedFormButton>
    </PinnedFormOpenedHolder>
  )
}

PinnedFormOpened.propTypes = {
  name: PropTypes.string,
  level: PropTypes.object,
  image: PropTypes.string,
  userPoints: PropTypes.number,

  amountPlaced: PropTypes.number,
  inputValue: PropTypes.string,
  onInputChange: PropTypes.func,
  inputFieldRef: PropTypes.func,
  onAmountChange: PropTypes.func,
  onAmountChangeOver: PropTypes.func,
  onPinnedMessageSend: PropTypes.func,
  onBack: PropTypes.func,
}

export default PinnedFormOpened
