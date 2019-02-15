import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { palette } from 'styled-theme'
import { AvatarCircular, BubbleAmount, BubbleName, BubbleText, BubbleInput } from 'components'
import { shadows } from '../../themes/extended'
import { bubbleAppears, fadeOut } from '../../themes/keyframes'
import { getPinnedBubbleInfo } from '../../../services/helpers'

const panelGenericCss = css`
  animation: ${bubbleAppears} 0.2s ease forwards 1;
`

const panelOverVideoCss = css`
  border-top-left-radius: 24px;
  border-bottom-left-radius: 24px;
  animation-name: ${bubbleAppears}, ${fadeOut};
  animation-duration: .2s, .3s;
  animation-direction: forwards;
  animation-iteration-count: 1;
  animation-timing-function: ease;
  animation-delay: 0s, 6s;
  animation-fill-mode: forwards;
`

const BubbleInfo = styled.div`
  margin-left: 10px;
`
const BubbleTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: ${props => props.isOverVideo ? 5 : 10}px;
`
const BubbleFooter = styled.div`
  background-color: ${props => palette('pinnedBubbleSecondary', getPinnedBubbleInfo(props.amountPlaced).palette)};
  padding: 0 10px;
  ${props => props.isOverVideo && 'padding-left: 50px;'}
`

const BubblePanel = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  background-color: ${props => palette('pinnedBubbleMain', getPinnedBubbleInfo(props.amountPlaced).palette)};
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
  margin: 5px 0;
  ${shadows.wide}
  ${props => props.isOverVideo ? panelOverVideoCss : panelGenericCss};
`

const BubbleInputForm = styled.form``

const ChatBubble = ({ image, name, amountPlaced, text, isInput, onPinnedMessageSend, inputOnChange, inputFieldRef, inputValue, isOverVideo }) => {
  const bubbleInfo = getPinnedBubbleInfo(amountPlaced)

  let Footer = null
  if (isInput) {
    const maxLength = bubbleInfo.maxLength
    Footer = (maxLength > 0 && (
      <BubbleFooter amountPlaced={amountPlaced}>
        <BubbleInputForm onSubmit={onPinnedMessageSend}>
          <BubbleInput
            maxLength={maxLength}
            onChange={inputOnChange}
            value={inputValue}
            palette={bubbleInfo.palette}
            innerRef={inputFieldRef}
          />
        </BubbleInputForm>
      </BubbleFooter>
    ))
  } else {
    const bubbleText = text.length > 0 ? (
      <BubbleText isOverVideo={isOverVideo} palette={bubbleInfo.palette}>{text}</BubbleText>
    ) : null
    Footer = (
      <BubbleFooter amountPlaced={amountPlaced} isOverVideo={isOverVideo}>
        {bubbleText}
      </BubbleFooter>
    )
  }

  return (
    <BubblePanel amountPlaced={amountPlaced} isOverVideo={isOverVideo}>
      <BubbleTop isOverVideo={isOverVideo}>
        <AvatarCircular big image={image} />
        <BubbleInfo>
          <BubbleName palette={bubbleInfo.palette}>{name}</BubbleName>
          <BubbleAmount palette={bubbleInfo.palette}>{amountPlaced} points</BubbleAmount>
        </BubbleInfo>
      </BubbleTop>
      { Footer }
    </BubblePanel>
  )
}

ChatBubble.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  amountPlaced: PropTypes.number,
  text: PropTypes.string,
  level: PropTypes.object,
  isInput: PropTypes.bool,
  inputOnChange: PropTypes.func,
  inputFieldRef: PropTypes.func,
  onPinnedMessageSend: PropTypes.func,
  inputValue: PropTypes.string,
  isOverVideo: PropTypes.bool,
}

export default ChatBubble
