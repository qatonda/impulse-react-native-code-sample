import { useMutation } from 'react-query';
import { ILocalMedia, IMediaType } from '../models/APIModels';
import { APIUploadResponseMedia } from '../services/api';
// import { encode } from 'node-base64-image';

export type UploadResponseBodyFields = {
  encodingType: string;
  // eslint-disable-next-line no-undef
  data: string | ArrayBuffer;
}

const useMediaUpload = () => {

  const uploadMediaMutation = useMutation('upload-response-media', APIUploadResponseMedia, {
    onSuccess: (response) => {
      console.log('uploadMediaMutation response: ', response);
    },
    onError: (error) => {
      console.log('uploadMediaMutation error: ', error);
    },
  });

  const upload = async (media: ILocalMedia, votedMedia: IMediaType): Promise<void> => {
    console.log('uploading media', media);
    let encodingType = 'png';
    switch (media.type) {
      case 'textOnly' || 'image':
        encodingType = 'png'; break;
      case 'video':
        encodingType = 'mp4'; break;
      case 'audio':
        encodingType = 'mp3'; break;
      default:
        encodingType = 'png'; break;
    }

    let mediaData = await ImageToDataURL(media.url);
    if (!mediaData) {
      mediaData = media.url;
    }

    if (mediaData as string) {
      const reg = /.*,/;
      mediaData = (mediaData as string).replace(reg, '');
    }

    // due to how we handle text responses (screenshot), the media may be doubly base64 encoded
    // detect this and decode the base64 string to reveal the initial (intended) base64 encoded
    // string
    //
    // encodings:
    //   1. use-react-screenshot outputs a base64 encoded string
    //   2. the url reader in `useMediaUpload` encodes again and outputs a base64 encoded string
    //
    if (media.type === 'textOnly') {
      // decode first layer of base64
      mediaData = Buffer.from(mediaData as string, 'base64').toString();
    }

    const body = {
      encodingType,
      data: mediaData,
    };

    const result = await uploadMediaMutation.mutateAsync({media, body, votedMedia});
    console.log('result: ', result);
  };

  const ImageToDataURL = (url: string): Promise<string | ArrayBuffer | null> => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
    }));

  return {upload};
};

export default useMediaUpload;
