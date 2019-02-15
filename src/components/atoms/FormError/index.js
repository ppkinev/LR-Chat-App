import styled from 'styled-components'
import { palette, size, font } from 'styled-theme'
import { fadeIn } from '../../themes/keyframes'

const FormError = styled.p`
  padding: 0 10px;
  font-family: ${font('primary')};
  font-size: ${size('fontLabel')};
  color: ${palette('danger', 0)};
  line-height: 20px;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
  animation: ${fadeIn} 0.3s ease forwards 1;
`

export default FormError
