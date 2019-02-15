import styled from 'styled-components'
import { font, palette, size } from 'styled-theme'

const BubbleAmount = styled.p`
  color: ${props => props.palette !== undefined ? palette('pinnedBubbleText', props.palette) : palette('grayscale', 0)};
  font-family: ${font('primary')};
  font-size: ${size('fontBubble')};
  margin: 2px 0;
`

export default BubbleAmount
