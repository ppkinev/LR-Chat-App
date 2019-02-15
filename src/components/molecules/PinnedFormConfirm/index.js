import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { palette } from 'styled-theme'
import { ButtonWide } from 'components'
import { slideFromBottom } from '../../themes/keyframes'

const PinnedFormConfirmHolder = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 10px 5px;
  z-index: 25;
  background-color: ${palette('white', 0)};
  animation: ${slideFromBottom} 0.3s ease forwards 1;
`

const PinnedFormConfirm = ({ onConfirm, onCancel }) => {
  return (
    <PinnedFormConfirmHolder>
      <ButtonWide main onClick={onConfirm}>Send a pinned message</ButtonWide>
      <ButtonWide onClick={onCancel}>Cancel</ButtonWide>
    </PinnedFormConfirmHolder>
  )
}

PinnedFormConfirm.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default PinnedFormConfirm
