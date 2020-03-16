import { useEffect, useState } from "react";
import { decode } from "blurhash";

// modified from https://gist.github.com/WorldMaker/a3cbe0059acd827edee568198376b95a
// https://github.com/woltapp/react-blurhash/issues/3
export function useBlurhash(
  blurhash: string | undefined | null,
  width: number = 32,
  height: number = 32,
  punch: number = 1
) {
  punch = punch || 1;

  const [url, setUrl] = useState(null as string | null);

  useEffect(() => {
    let isCancelled = false;

    if (!blurhash) return;

    // decode hash
    const pixels = decode(blurhash, width, height, punch);

    // temporary canvas to create a blob from decoded ImageData
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    const imageData = context!.createImageData(width, height);
    imageData.data.set(pixels);
    context!.putImageData(imageData, 0, 0);
    canvas.toBlob(blob => {
      if (!isCancelled) {
        setUrl(oldUrl => {
          if (oldUrl) {
            URL.revokeObjectURL(oldUrl);
          }
          return URL.createObjectURL(blob);
        });
      }
    });

    return function cleanupBlurhash() {
      isCancelled = true;
      setUrl(oldUrl => {
        if (oldUrl) {
          URL.revokeObjectURL(oldUrl);
        }
        return null;
      });
    };
  }, [blurhash, height, width, punch]);

  return url;
}
