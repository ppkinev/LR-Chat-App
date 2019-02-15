import styled from 'styled-components'
import { fadeIn } from '../../themes/keyframes'

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  max-width: 500px;
  animation: ${fadeIn} 0.5s ease forwards 1;
`

export default FormWrapper
