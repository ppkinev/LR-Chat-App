import styled from 'styled-components'
import { palette, font } from 'styled-theme'

const PinnedFormButton = styled.button`
  -webkit-appearance: none;
  border: none;
  outline: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-transform: uppercase;
  border-top: 1px solid ${palette('grayscale', 5)};
  font-size: 12px;
  font-family: ${font('primary')};
  color: ${palette('cta', 1)};
  cursor: pointer;
  border-radius: 3px;
  transition: background-color 0.2s ease, 
   color 0.2s ease;
  
  &:hover {
    background-color: ${palette('cta', 1)};
    color: ${palette('white', 0)};
  }
`

export default PinnedFormButton
