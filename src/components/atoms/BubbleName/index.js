import styled from 'styled-components'
import { font, palette, size } from 'styled-theme'

const BubbleName = styled.p`
  color: ${props => props.palette !== undefined ? palette('pinnedBubbleText', props.palette) : palette('grayscale', 1)};
  font-family: ${font('primary')};
  font-size: ${size('fontBubble')};
  opacity: .7;
  margin: 2px 0;
`
export default BubbleName
