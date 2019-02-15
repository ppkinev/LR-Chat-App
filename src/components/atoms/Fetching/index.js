import React from 'react'
import styled from 'styled-components'
import { palette } from 'styled-theme'
import { spinner } from '../../themes/keyframes'

const border = '12px'
const size = 60

const Spinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${size}px;
  height: ${size}px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border-top: ${border} solid ${palette('primary', 0)};
  border-left: ${border} solid ${palette('primary', 0)};
  border-bottom: ${border} solid ${palette('primary', 0)};
  border-right: ${border} solid ${palette('primary', 3)};
  animation: ${spinner} 1s linear forwards infinite;
`

const Holder = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  background-color: #ffffff;
`

const Fetching = () => {
  return (<Holder><Spinner /></Holder>)
}

export default Fetching
