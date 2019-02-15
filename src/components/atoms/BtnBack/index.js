import styled from 'styled-components'
import { iconsPath } from '../../../config'

const BtnBack = styled.button`
  -webkit-appearance: none;
  border: none;
  background-color: transparent;
  outline: none;
  display:inline-block;
  width: 30px;
  height: 30px;
  background-image: url(${iconsPath}/icon-arrow-back.svg);
  background-repeat: no-repeat;
  background-size: 16px;
  background-position: left center;
  cursor: pointer;
  margin-right: 10px;
`

export default BtnBack
