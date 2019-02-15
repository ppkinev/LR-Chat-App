import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { palette } from 'styled-theme'
import { AvatarCircular, MessageName, MessageText, MessageTime } from 'components'
import { messageAppears, videoMessageAppears, videoMessageFadeOut } from '../../themes/keyframes'

const videoLineCss = css`
  height: 40px;
  padding: 0 5px;
  background-color: ${palette('white', 0)};
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  max-width: 100%;
  box-sizing: border-box;
  
  animation-name: ${videoMessageAppears}, ${videoMessageFadeOut};
  animation-duration: .2s, .3s;
  animation-direction: forwards;
  animation-iteration-count: 1;
  animation-timing-function: ease;
  animation-delay: 0s, 3.5s;
  animation-fill-mode: forwards;
`

const genericLineCss = css`
  padding: 0 10px;
  animation: ${messageAppears} 0.2s ease forwards 1;
`

const messageLineCss = css`
  max-width: calc(100% - 36px);
  box-sizing: border-box;
`

const MessageLineWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
  margin: 5px 0;
  ${props => props.isOverVideo ? videoLineCss : genericLineCss}
`

const MessageLineTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

const MessagelineBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: ${props => props.isOverVideo ? '0' : '1'};
  margin-left: 5px;
  ${props => props.isOverVideo && messageLineCss}
`

const MessageLine = ({ image, time, name, isAdmin, text, isSystem, isOverVideo }) => {
  if (isSystem) {
    return (
      <MessageLineWrapper>
        <MessageText isSystem>{text}</MessageText>
      </MessageLineWrapper>
    )
  }
  return (
    <MessageLineWrapper isOverVideo={isOverVideo}>
      <AvatarCircular image={image} />
      <MessagelineBody isOverVideo={isOverVideo}>
        <MessageLineTop>
          <MessageName admin={isAdmin}>{name}</MessageName>
          <MessageTime>{time}</MessageTime>
        </MessageLineTop>
        <MessageText isOverVideo={isOverVideo}>{text}</MessageText>
      </MessagelineBody>
    </MessageLineWrapper>
  )
}

MessageLine.propTypes = {
  image: PropTypes.string,
  time: PropTypes.string,
  name: PropTypes.string,
  isAdmin: PropTypes.bool,
  isSystem: PropTypes.bool,
  isOverVideo: PropTypes.bool,
  text: PropTypes.string,
  level: PropTypes.object,
}

export default MessageLine
