import PropTypes from 'prop-types'
import styled from 'styled-components'
import { font, palette, size } from 'styled-theme'

const BubbleInput = styled.input.attrs({
  placeholder: 'Your message will be visible to everyone',
  maxLength: props => props.maxLength,
})`
  color: ${props => props.palette !== undefined ? palette('pinnedBubbleText', props.palette) : palette('grayscale', 0)};
  font-family: ${font('primary')};
  font-size: ${size('fontBubble')};
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 6px;
  outline: none;
  border: 0;
  background-color: transparent;
  ${props => props.palette !== undefined && 'opacity: 0.7;'}
  
  &::placeholder {
    font-size: ${size('fontMessageRegular')};
    color: ${props => props.palette !== undefined ? palette('pinnedBubblePlaceholder', props.palette) : palette('blackTransparent', 6)};
    text-decoration: underline;
  }
`

BubbleInput.propTypes = {
  maxLength: PropTypes.number,
}

export default BubbleInput
