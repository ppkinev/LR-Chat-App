import styled from 'styled-components'
import { palette, size, font } from 'styled-theme'

const TextLink = styled.p`
  font-family: ${font('primary')};
  font-size: ${size('fontMessageRegular')};
  color: ${palette('grayscale', 0)};
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${palette('primary', 0)};  
  }
`

export default TextLink
