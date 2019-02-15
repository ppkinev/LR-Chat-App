import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { palette, font } from 'styled-theme'
import { AvatarCircular } from 'components'
import { pinnedIconBgFill, bubbleAppears } from '../../themes/keyframes'
import { getPinnedBubbleInfo } from '../../../services/helpers'

const PinnedBubbleIconHolder = styled.div`
  position: relative;
  overflow: hidden;
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 26px;
  border-radius: 13px;
  padding: 0 6px 0 4px;
  margin-right: 5px;
  background-color: ${props => palette('pinnedBubbleSecondary', props.palette)};
  animation: ${bubbleAppears} 0.2s ease forwards 1;
`
PinnedBubbleIconHolder.propTypes = { palette: PropTypes.number }

const PinnedBubbleIconText = styled.h5`
  position: relative;
  margin: 0;
  font-family: ${font('primary')};
  color: ${props => palette('pinnedBubbleText', props.palette)};
  font-size: 11px;
  margin-left: 4px;
`
PinnedBubbleIconText.propTypes = { palette: PropTypes.number }

const PinnedBubbleIconAnimated = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0;
  background-color: ${props => palette('pinnedBubbleMain', props.palette)};
  animation: ${pinnedIconBgFill} ${props => props.duration}s linear forwards 1; 
`
PinnedBubbleIconAnimated.propTypes = {
  palette: PropTypes.number,
  duration: PropTypes.number,
}


const PinnedBubbleIcon = ({ amountPlaced, image }) => {
  const info = getPinnedBubbleInfo(amountPlaced)

  return (
    <PinnedBubbleIconHolder palette={info.palette}>
      <PinnedBubbleIconAnimated duration={info.time} palette={info.palette} />
      <AvatarCircular small image={image} />
      <PinnedBubbleIconText palette={info.palette}>{amountPlaced} pts</PinnedBubbleIconText>
    </PinnedBubbleIconHolder>
  )
}

PinnedBubbleIcon.propTypes = {
  amountPlaced: PropTypes.number.isRequired,
  image: PropTypes.string,
}

export default PinnedBubbleIcon
