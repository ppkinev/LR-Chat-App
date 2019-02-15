import styled from 'styled-components'
import { fadeIn } from '../../themes/keyframes'

const VideoChatHolder = styled.div`
  position: absolute;
  bottom: 0;
  animation: ${fadeIn} 0.3s ease forwards 1;
  
  overflow: hidden;
  padding: 10px 10px 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 100%;
  box-sizing: border-box;
`

export default VideoChatHolder
