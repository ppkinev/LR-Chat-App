import styled from 'styled-components'
import PropTypes from 'prop-types'
import { palette, size } from 'styled-theme'

const TextInput = styled.input.attrs({
  type: 'text',
  placeholder: props => props.placeholder || '',
})`
  outline: none;
  height: ${size('inputHeight')};
  line-height: ${size('inputHeight')};
  padding: 0 10px;
  box-sizing: border-box;
  width: 100%;
  border-radius: 4px;
  border: 2px solid transparent;
  background-color: ${palette('white', 0)};
  font-size: ${size('fontInput')};
  color: ${palette('grayscale', 3)};
  transition: border 0.25s ease;
  
  &:focus {
    color: ${palette('grayscale', 0)};
    border: 2px solid ${palette('primary', 0)};
  }
`

TextInput.propTypes = {
  placeholder: PropTypes.string,
}

export default TextInput
