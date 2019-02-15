import styled from 'styled-components'
import PropTypes from 'prop-types'
import { font, palette, size } from 'styled-theme'
import { iconsPath } from '../../../config'

const ICON_SIZE = 14

const MessageName = styled.p`
  color: ${props => props.admin ? palette('cta', 0) : palette('grayscale', 3)};
  font-family: ${font('primary')};
  font-size: ${size('fontMessageRegular')};
  margin: 0 4px;
  background-image: ${props => props.admin ? `url(${iconsPath}/icon-crown.svg)` : 'none'};
  background-repeat: no-repeat;
  background-size: ${ICON_SIZE}px;
  background-position: left center;
  padding-left: ${props => props.admin ? `${ICON_SIZE + 4}px` : '0'}
`

MessageName.propTypes = {
  admin: PropTypes.bool,
}

export default MessageName
