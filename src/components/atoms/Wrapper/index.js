import styled from 'styled-components'
import { size } from 'styled-theme'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  
  @media all and ${size('landscape')} {
    flex-direction: row;  
  }
`

export default Wrapper
