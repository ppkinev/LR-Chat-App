import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { palette } from 'styled-theme'
import isMobile from 'ismobilejs'

const thumbSize = isMobile.phone ? 25 : 15
const thumbSizeActive = isMobile.phone ? 50 : 30

const getSliderThumbStyles = (color) => {
  return css`
    cursor: pointer;
    -webkit-appearance: none;
    background-color: ${color};
    width: ${thumbSize}px;
    height: ${thumbSize}px;
    border-radius: 50%;
    transition: width 0.1s ease, height 0.1s ease;
  `
}

const sliderThumbActiveStyles = css`
  width: ${thumbSizeActive}px;
  height: ${thumbSizeActive}px;
`

const PinnedFormSlider = styled.input.attrs({
  type: 'range',
  min: 1,
  step: 1,
  max: props => props.max,
})`
  position: relative;
  z-index: 3;
  -webkit-appearance: none;
  width: 100%;
  height: 2px;
  border-radius: 2px;
  background-color: ${palette('grayscale', 4)};
  outline: none;
  padding: 0;
  margin: 10px 0 20px;
  transition: background-color 0.2s ease; 
  
  &::-moz-focus-inner,
  &::-moz-focus-outer { 
    border: 0; 
  }
  
  &::-webkit-slider-thumb {
    ${getSliderThumbStyles(palette('cta', 1))}
  }
  &::-moz-range-thumb {
    ${getSliderThumbStyles(palette('cta', 1))}
  }
  
  &:active {
    background-color: ${palette('cta', 1)};
  }
  &:active::-webkit-slider-thumb {
    ${sliderThumbActiveStyles}
  }
  &:active::-moz-range-thumb {
    ${sliderThumbActiveStyles}
  }
`

PinnedFormSlider.propTypes = {
  max: PropTypes.number,
}

export default PinnedFormSlider
