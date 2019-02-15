import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { palette, font } from 'styled-theme'
import { getPinnedBubbleInfo } from '../../../services/helpers'

const PinnedFormChar = styled.h6`
  font-family: ${font('primary')}; 
  font-size: 10px;
  color: ${palette('grayscale', 3)};
  font-weight: 400;
  margin: 0;
  padding: 0;
`

const PinnedFormCharInfo = ({ length, amountPlaced }) => {
  const max = getPinnedBubbleInfo(amountPlaced).maxLength
  return (
    <PinnedFormChar>{max > 0 ? length : 0}/{max}</PinnedFormChar>
  )
}

PinnedFormCharInfo.propTypes = {
  length: PropTypes.number,
  amountPlaced: PropTypes.number,
}

export default PinnedFormCharInfo
