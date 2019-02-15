import React from 'react'
import PropTypes from 'prop-types'
import { VideoHolder, VideoChatHolder, StreamAMGVideo, YoutubeVideoIframe } from 'components'

const VideoStream = ({ chatCollapsed, messages }) => {
  const chatOverVideo = chatCollapsed ? (
    <VideoChatHolder>
      {messages}
    </VideoChatHolder>
  ) : null

  // Define needed video provider component
  // const videoStream = <StreamAMGVideo />
  const videoStream = <YoutubeVideoIframe id={'JyIL-vEFdbI'} />

  return (
    <VideoHolder chatCollapsed={chatCollapsed}>
      {videoStream}
      {chatOverVideo}
    </VideoHolder>
  )
}

VideoStream.propTypes = {
  chatCollapsed: PropTypes.bool,
  messages: PropTypes.array,
}

export default VideoStream
