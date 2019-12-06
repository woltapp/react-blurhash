import { decode } from 'blurhash'
import { useEffect, useState } from 'react'

function useBlurhash (blurhash: string, width: number, height: number, punch: number = 1) {
  punch = punch || 1

  const [url, setUrl] = useState(null as string | null)

  useEffect(() => {
    let isCancelled = false

    // decode hash
    const pixels = decode(blurhash, width, height, punch)

    // temporary canvas to create a blob from decoded ImageData
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const context = canvas.getContext('2d')
    const imageData = context!.createImageData(width, height)
    imageData.data.set(pixels)
    context!.putImageData(imageData, 0, 0)
    canvas.toBlob(blob => {
      if (!isCancelled) {
        setUrl(oldUrl => {
          if (oldUrl) {
            URL.revokeObjectURL(oldUrl)
          }
          return URL.createObjectURL(blob)
        })
      }
    })

    return function cleanupBlurhash () {
      isCancelled = true
      setUrl(oldUrl => {
        if (oldUrl) {
          URL.revokeObjectURL(oldUrl)
        }
        return null
      })
    }
  }, [blurhash, height, width, punch])

  return url
}