import { keyframes } from 'styled-components'

export const slideFromBottom = keyframes`
  from {
    transform: translate3d(0, 100%, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
`

export const pinnedIconBgFill = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

export const messageAppears = keyframes`
  0%{
    opacity: 0;
    transform: translate3d(-10%, 0, 0);
  }
  80%{
    opacity: 1;
    transform: translate3d(5%, 0, 0);
  }
  100%{
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`

export const videoMessageAppears = keyframes`
  0%{
    opacity: 0;
    transform: translate3d(-10%, 0, 0);
  }
  80%{
    opacity: .6;
    transform: translate3d(5%, 0, 0);
  }
  100%{
    opacity: .6;
    transform: translate3d(0, 0, 0);
  }
`

export const videoMessageFadeOut = keyframes`
  from {
    opacity: .6;
  }
  to {
    opacity: 0;
  }
`

export const bubbleAppears = keyframes`
  0%{
    opacity: 0;
    transform: scale3d(1.3, 1.3, 1);
  }
  50%{
    opacity: 1;
    transform: scale3d(1.15, 1.15, 1);
  }
  100%{
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
`

export const spinner = keyframes`
  from {
    transform: translate(-50%, -50%) rotateZ(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotateZ(359deg);
  }
`
