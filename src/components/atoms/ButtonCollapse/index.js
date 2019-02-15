import styled from 'styled-components'
import {size} from 'styled-theme'
import { iconsPath } from '../../../config'

const ButtonCollapse = styled.button`
  -webkit-appearance: none;
  border: none;
  background-color: transparent;
  outline: none;
  display:inline-block;
  width: 30px;
  height: 30px;
  background-image: url(${iconsPath}/icon-caret-${props => props.collapsed ? 'up' : 'down'}.svg);
  background-repeat: no-repeat;
  background-size: 16px;
  background-position: center;
  cursor: pointer;
  margin-right: 10px;
  
  @media all and ${size('landscape')} {
    display: none;
  }
`

export default ButtonCollapse
