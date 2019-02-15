import styled from 'styled-components'
import { palette, font } from 'styled-theme'

const PinnedFormPoints = styled.h3`
  font-family: ${font('primary')};
  font-size: 16px;
  color: ${palette('grayscale', 0)};
  font-weight: 700;
  margin: 15px 0;
  line-height: 24px;
  
  &:after {
    content: ' points';
    color: ${palette('grayscale', 1)};
    font-weight: 400;
  }
`

export default PinnedFormPoints
