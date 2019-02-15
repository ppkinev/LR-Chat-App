import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { palette, font } from 'styled-theme'
import { getPinnedBubbleInfo } from '../../../services/helpers'
import { iconsPath } from '../../../config'

const PinnedFormPinInfoStyled = styled.h6`
  font-family: ${font('primary')}; 
  font-size: 10px;
  color: ${palette('grayscale', 3)};
  font-weight: 400;
  background: url(${iconsPath}/icon-pin.svg) no-repeat;
  background-size: 12px;
  background-position: left center;
  padding-left: 15px;
  margin: 0;
`

const PinnedFormPinInfo = ({ amountPlaced }) => {
  return (
    <PinnedFormPinInfoStyled>{getPinnedBubbleInfo(amountPlaced).pinTime}</PinnedFormPinInfoStyled>
  )
}

PinnedFormPinInfo.propTypes = {
  amountPlaced: PropTypes.number,
}

export default PinnedFormPinInfo
