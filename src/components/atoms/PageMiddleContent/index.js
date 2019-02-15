import styled from 'styled-components'
import { palette } from 'styled-theme'

const PageMiddleContent = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 10px;
  box-sizing: border-box;
  background-color: ${palette('primary', 3)};
  display: flex;
  align-items: center;
  justify-content: center;
`

export default PageMiddleContent
