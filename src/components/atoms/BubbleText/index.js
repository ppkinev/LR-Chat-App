import styled, {css} from 'styled-components'
import { font, palette, size } from 'styled-theme'

const overVideoCss = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const BubbleText = styled.p`
  color: ${props => props.palette !== undefined ? palette('pinnedBubbleText', props.palette) : palette('grayscale', 0)};
  font-family: ${font('primary')};
  font-size: ${size('fontBubble')};
  margin: 0;
  padding: 6px 0;
  max-width: 100%;
  ${props => props.isOverVideo && overVideoCss}
`

export default BubbleText
