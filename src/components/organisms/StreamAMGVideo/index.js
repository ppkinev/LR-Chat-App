/* eslint-disable react/prefer-stateless-function, no-bitwise */
import React, { Component } from 'react'
import { VideoPlayerHolder } from 'components'

const DATE_ID = Date.now() / 1000 | 0
const PLAYER_ID = `kaltura-video-player-${DATE_ID}`

const playerInit = () => {
  const script = document.createElement('script')

  script.src = 'https://open.http.mp.streamamg.com/p/2000011/sp/200001100/embedIframeJs/uiconf_id/30007689/partner_id/2000011'
  script.async = true

  script.onload = () => {
    window.kWidget.embed({
      targetId: PLAYER_ID,
      wid: '_2000011',
      uiconf_id: 30007689,
      flashvars: {
        EmbedPlayer: {
          EnableFullscreen: false,
          NotPlayableDownloadLink: false,
        },
        streamerType: 'auto',
        autoPlay: true,
      },
      cache_st: DATE_ID,
      entry_id: '0_4cqo82x5',
    })
  }

  document.body.appendChild(script)
}

const playerDestroy = () => {
  if (window.kWidget) {
    window.kWidget.destroy()
  }
}

class StreamAMGVideo extends Component {
  componentWillMount() {
    playerInit()
  }

  componentWillUnmount() {
    playerDestroy()
  }

  render() {
    return (
      <VideoPlayerHolder id={PLAYER_ID} />
    )
  }
}

export default StreamAMGVideo
