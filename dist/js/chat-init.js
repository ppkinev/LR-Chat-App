/* eslint-disable */
window.addEventListener('load', function () {
  var script = document.getElementById('streaming-chat-init')
  var holder = script.parentNode
  var iframe = document.createElement('iframe')

  iframe.width = '100%'
  iframe.height = '100%'
  iframe.style.cssText = 'border:none;outline:none;background-color:#fff;'

  // Absolute path is needed (define TEST/PROD)
  iframe.src = './index.html'
  holder.appendChild(iframe)

  iframe.onload = function () {
    window.addEventListener('message', listenToChatApp)
  }

  function listenToChatApp(ev) {
    var origins = ['http://localhost:63342']
    if (
      origins.some(function (origin) {
        return ev.origin === origin
      })
    ) {
      var mes = JSON.parse(ev.data)

      if (mes.isActive) {
        // WORKS
        // do something on different messages
      }
    }
  }
})
