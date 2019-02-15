import styled, { css } from 'styled-components'
import { font, palette, size } from 'styled-theme'

const overVideoCss = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const MessageText = styled.p`
  color: ${props => !props.isSystem ? palette('grayscale', 0) : palette('grayscale', 4)};
  font-family: ${font('primary')};
  font-size: ${size('fontMessageRegular')};
  margin: 0 4px;
  max-width: 100%;
  ${props => props.isOverVideo && overVideoCss}
`

export default MessageText
