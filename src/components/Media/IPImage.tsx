import React, { useEffect, useState } from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';

interface IPImageProps {
  src: string
  style: StyleProp<ImageStyle>
}

async function getBase64FromBlob(blobUrl: string): Promise<string> {
  const data = await fetch(blobUrl);
  return data.text();
}

export default function IPImage({ src, style }: IPImageProps) {
  const [overrideSrc, setOverrideSrc] = useState<string | undefined>();

  useEffect(() => {
    // check if it's a blob url react-native Image does not support blob urls, so we need to fetch the
    // base64 data before setting the source
    //
    // https://stackoverflow.com/a/38786566/1104126
    if (src.startsWith('blob:')) {
      getBase64FromBlob(src).then((base64) => {
        console.log('set override source: ', base64);
        setOverrideSrc(base64);
      });
    }
  }, [src]);

  return (
    <Image
      source={{ uri: overrideSrc || src }}
      style={style}
    />
  );
}
