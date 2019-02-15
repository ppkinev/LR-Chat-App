import styled from 'styled-components'
import {size} from 'styled-theme'

const VideoHolder = styled.div`
  width: 100%;
  height: ${props => props.chatCollapsed ? 'calc(100% - 40px)' : '30%'};
  background-color: #000;
  transition: height 0.3s ease;
  
  @media all and ${size('landscape')} {
    height: auto;
    width: 70%;
  }
`

export default VideoHolder
