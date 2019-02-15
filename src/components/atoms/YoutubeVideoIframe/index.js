import PropTypes from 'prop-types'
import styled from 'styled-components'

const YoutubeVideoIframe = styled.iframe.attrs({
  src: props => `https://www.youtube.com/embed/${props.id}`,
  allowFullScreen: false,
})`
  width: 100%;
  height: 100%;
  transition: height 0.3s ease;
`

YoutubeVideoIframe.propTypes = {
  id: PropTypes.string,
}

export default YoutubeVideoIframe
