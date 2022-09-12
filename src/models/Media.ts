import uuid from '../services/uuid';
import { IMediaType, IMediaTypes } from './APIModels';

interface BuildMediaParams {
  url: string;
  type: IMediaTypes;
}

export function buildMedia(params: BuildMediaParams): IMediaType {
  return {
    ...params,
    id: uuid(),
    uploaded: true,
  };
}
