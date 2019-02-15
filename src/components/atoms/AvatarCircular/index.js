import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Image = styled.img`
  position: absolute;
  width: 100%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
const getHolderSize = function getHolderSize(props) {
  if (props.big) return '36px'
  if (props.small) return '18px'
  return '30px'
}
const ImageHolder = styled.div`
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  width: ${props => getHolderSize(props)};
  height: ${props => getHolderSize(props)};
  flex-shrink: 0;
`

const AvatarCircular = ({ image, big, small }) => {
  return (
    <ImageHolder big={big} small={small}>
      <Image src={image} />
    </ImageHolder>
  )
}

AvatarCircular.propTypes = {
  image: PropTypes.string,
  big: PropTypes.bool,
  small: PropTypes.bool,
}

AvatarCircular.defaultProps = {
  image: 'https://static.rewarded.club/content/main/assets/images/default-profile.png',
}

export default AvatarCircular
