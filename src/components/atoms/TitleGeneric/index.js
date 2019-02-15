import styled from 'styled-components'
import {palette, font, size} from 'styled-theme'

const TitleGeneric = styled.h2`
  font-family: ${font('primary')};
  font-size: ${size('fontTitle')};
  color: ${palette('grayscale', 0)};
`

export default TitleGeneric
