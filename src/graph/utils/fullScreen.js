function requestFullScreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element['webkitRequestFullscreen']) {
    element['webkitRequestFullscreen']()
  }
}

function isFullScreenSupported(document) {
  const body = document.body

  return !!(body['webkitRequestFullscreen'] || (body.requestFullscreen && document.fullscreenEnabled))
}

function isFullScreen(document) {
  return !!(document['webkitIsFullScreen'] || document.fullscreenElement)
}

function exitFullScreen(document) {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document['webkitExitFullscreen']) {
    document['webkitExitFullscreen']()
  }
}

export const fullScreen = ElTarget => {
  if (!isFullScreenSupported(document)) return

  const hasFull = isFullScreen(document)

  if (!hasFull) {
    requestFullScreen(ElTarget)
  } else {
    exitFullScreen(document)
  }
}
