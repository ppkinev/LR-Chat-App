import styled from 'styled-components'
import PropTypes from 'prop-types'
import { palette, font } from 'styled-theme'

const getButtonStyle = (props) => {
  if (props.main) {
    return {
      color: palette('white', 0),
      bg: palette('cta', 1),
    }
  }

  if (props.fb) {
    return {
      color: palette('white', 0),
      bg: palette('fb', 0),
    }
  }

  return {
    color: palette('grayscale', 1),
    bg: palette('grayscale', 5),
  }
}

const ButtonWide = styled.button.attrs({
  type: props => props.submit ? 'submit' : 'button',
})`
  -webkit-appearance: none;
  border: none;
  outline: none;
  display: block;
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-family: ${font('primary')};
  font-size: 12px;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  border-radius: 3px;
  margin-bottom: 5px;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.7;
  }
  
  background-color: ${props => getButtonStyle(props).bg};
  color: ${props => getButtonStyle(props).color};
`

ButtonWide.propTypes = {
  main: PropTypes.bool,
  fb: PropTypes.bool,
  submit: PropTypes.bool,
}

export default ButtonWide
