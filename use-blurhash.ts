import { decode } from 'blurhash'
import { useEffect, useState } from 'react'

function useBlurhash (blurhash: string, width: number, height: number, punch: number = 1) {
  punch = punch || 1

  const [url, setUrl] = useState(null as string | null)

  useEffect(() => {
    // decode hash
    const pixels = decode(blurhash, width, height, punch)

    // temporary canvas to create a blog from decoded ImageData
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const context = canvas.getContext('2d')
    const imageData = context!.createImageData(width, height)
    imageData.data.set(pixels)
    context!.putImageData(imageData, 0, 0)
    canvas.toBlob(blob => {
      if (url) {
        URL.revokeObjectURL(url)
      }
      setUrl(URL.createObjectURL(blob))
    })

    return function cleanupBlurhash () {
      if (url) {
        URL.revokeObjectURL(url)
        setUrl(null)
      }
    }
  }, [blurhash, height, width, punch])

  return url
}
