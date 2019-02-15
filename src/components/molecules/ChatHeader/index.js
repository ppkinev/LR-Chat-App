import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { palette } from 'styled-theme'
import { ButtonCollapse, TitleGeneric } from 'components'
import { shadows } from '../../themes/extended'

const ChatHeaderHolder = styled.div`
  position: relative;
  z-index: 10;
  background-color: ${palette('white', 0)};
  border-bottom: 1px solid ${palette('grayscale', 5)};
  box-sizing: border-box;
  padding: 0 15px;
  flex-shrink: 0;
  ${shadows.wide}
  ${props => props.bubblesExist && 'height: 80px; overflow: hidden;'}
`
ChatHeaderHolder.propTypes = { bubblesExist: PropTypes.bool }

const ChatHeaderTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

const ChatHeaderBottom = styled.div`
  box-sizing: border-box;
  padding: 5px 0 10px;
  white-space: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`

const ChatHeader = ({ collapsed, onHeaderClick, pinnedBubbleIcons = [] }) => {
  const bottomPart = pinnedBubbleIcons.length
    ? <ChatHeaderBottom>{pinnedBubbleIcons}</ChatHeaderBottom>
    : null
  const bubblesExist = Boolean(pinnedBubbleIcons.length)
  const buttonCollapse = onHeaderClick ? (<ButtonCollapse collapsed={collapsed} />) : null

  return (
    <ChatHeaderHolder bubblesExist={bubblesExist}>
      <ChatHeaderTop onClick={onHeaderClick}>
        {buttonCollapse}
        <TitleGeneric>Live chat</TitleGeneric>
      </ChatHeaderTop>
      {bottomPart}
    </ChatHeaderHolder>
  )
}

ChatHeader.propTypes = {
  collapsed: PropTypes.bool,
  onHeaderClick: PropTypes.func,
  pinnedBubbleIcons: PropTypes.array,
}

export default ChatHeader
