import React from 'react';
import { IMediaType, IQuestionType } from '../../models/APIModels';
import MediaControlCard from '../Media/MediaControlCard';
import AudioControlCard from '../Media/AudioControlCard';
import { OVERLAY_SPECS } from '../../utils/constants';
import '../Card/media-card-styles.css';
import { useOpacity } from '../../hooks/useOpacity';
import { Location } from '../../models/CardModels';
import QuestionDescription from '../Card/QuestionDescription';
import IPImage from '../Media/IPImage';

type ResponseMediaProps = {
  question: IQuestionType
  media?: IMediaType
  location: Location
  preventSwipeReader: () => string[]
}

export default function ResponseMediaPreview ({ question, media, location, preventSwipeReader }: ResponseMediaProps) {
  const { emoji, gradient, opacity } = useOpacity(location, preventSwipeReader);

  let element;
  if (media) {
    if (media.type === 'video') {
      // mirror the video component since the original recorded data is not mirrored
      element = <MediaControlCard url={media.url} isPlaying={true} autoplay={true} mirror={true} />;
    } else if (media.type === 'image' || media.type === 'textOnly') {
      console.log('textOnly url', media.url);
      element = (
        <IPImage
          src={media.url}
          style={{
            resizeMode: 'cover',
            borderRadius: 30,
            width: '100%',
            height: '100%',
          }}
        />
      );
    } else if (media.type === 'audio') {
      element = <AudioControlCard url={media.url} />;
    }
  }

  return (
    <div className="media-card-container">
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 30,
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        {element}
      </div>
      <div className="media-card-question-description">
        <QuestionDescription question={question} />
      </div>
      <div className="media-card-overflow" style={{ background: `linear-gradient(to right, ${gradient.layer0}, ${gradient.layer1})` }} >
        <p className="media-card-overflow-emoji" style={{ fontSize: OVERLAY_SPECS.EMOJI_INITIAL_FONT_SIZE + OVERLAY_SPECS.EMOJI_INITIAL_FONT_SIZE * opacity }}>{emoji}</p>
      </div>
    </div>
  );
}
