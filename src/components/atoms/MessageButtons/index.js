import styled, { css } from 'styled-components'
import { iconsPath } from '../../../config'

const buttonsCss = css`
  position: absolute;
  top: 50%;
  transform: translate3d(0,-50%,0);
  width: 30px;
  height: 30px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 70%;
  background-color: transparent;
  cursor: pointer;
  border-radius: 50%;
  border: 2px solid #d4e9fa;
  transition: background-color 0.2s ease, background-size 0.2s ease; 
  
  &:after {
    content: '';
    width: 40px;
    height: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  &:hover {
    background-color: #d4e9fa;
    background-size: 50%;
  }
`

export const SendBtn = styled.div`
  ${buttonsCss}
  /* background-color: blue; */
  background-image: url(${iconsPath}/icon-send.svg);
  right: 4px;
`

export const MoneyBtn = styled.div`
  ${buttonsCss}
  /* background-color: gold; */
  background-image: url(${iconsPath}/icon-points.svg);
  left: 4px;
`
