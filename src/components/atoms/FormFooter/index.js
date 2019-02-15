import styled from 'styled-components'

const ifMultipleChildren = children => (children && Array.isArray(children) && children.length > 1)

const FormFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${props => ifMultipleChildren(props.children) ? 'space-between' : 'center'};
  width: 100%;
`

export default FormFooter
