import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ButtonWide } from 'components'
import { fadeIn } from '../../themes/keyframes'

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  max-width: 500px;
  min-width: 240px;
  animation: ${fadeIn} 0.5s ease forwards 1;
`

const ConnectForm = ({ onEmail, onFB }) => {
  return (
    <Wrapper>
      <ButtonWide submit main onClick={onEmail}>Sign in with Everton Rewards</ButtonWide>
      <ButtonWide fb onClick={onFB}>Sign in with Facebook</ButtonWide>
    </Wrapper>
  )
}

ConnectForm.propTypes = {
  onFB: PropTypes.func.isRequired,
  onEmail: PropTypes.func.isRequired,
}

export default ConnectForm
