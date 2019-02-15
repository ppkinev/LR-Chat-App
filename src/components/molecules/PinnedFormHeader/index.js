import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {palette} from 'styled-theme'

import { BtnBack, TitleGeneric } from 'components'

const PinnedFormHeaderHolder = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  border-bottom: 1px solid ${palette('grayscale', 5)};
`

const PinnedFormHeader = ({ onBack }) => {
  return (
    <PinnedFormHeaderHolder>
      <BtnBack onClick={onBack} />
      <TitleGeneric>Send a pinned message</TitleGeneric>
    </PinnedFormHeaderHolder>
  )
}

PinnedFormHeader.propTypes = {
  onBack: PropTypes.func,
}

export default PinnedFormHeader
