import styled from 'styled-components'
import isMobile from 'ismobilejs'
import { size } from 'styled-theme'

const fontSize = isMobile.phone ? size('fontBubble') : size('fontMessageRegular')
const MessageInput = styled.input.attrs({
  placeholder: 'Say something...',
  type: 'text',
  maxLength: 100,
})`
  box-sizing: border-box;
  background-color: white;
  outline: none;
  opacity: 0.7;
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: ${fontSize};
  padding: 0 48px;
  border: 0;
    
  &:focus {
    
  }
`

export default MessageInput
