import styled from 'styled-components'
import { font, palette, size } from 'styled-theme'

const MessageTime = styled.p`
  color: ${palette('grayscale', 3)};
  font-family: ${font('primary')};
  font-size: ${size('fontMessageRegular')};
  margin: 0 4px 0 6px;
`

export default MessageTime
