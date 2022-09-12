import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import MediaControlCard from '../Media/MediaControlCard';
import './media-card-styles.css';
import { useOpacity } from '../../hooks/useOpacity';
import QuestionDescription from './QuestionDescription';
import { OVERLAY_SPECS } from '../../utils/constants';
import { IMediaType, IQuestionType } from '../../models/APIModels';
import { Location } from '../../models/CardModels';

type MediaCardProps = {
  question: IQuestionType
  location: Location
  autoplay: boolean
  preventSwipeReader: () => string[]
  shouldMute?: boolean
  onError?: () => void
  overrideMedia?: IMediaType
}

const MediaCard = ({ question, location, autoplay, preventSwipeReader, shouldMute, onError, overrideMedia }: MediaCardProps) => {
  const { emoji, gradient, opacity } = useOpacity(location, preventSwipeReader);

  const mediaView = () => {
    const media = overrideMedia || (Array.isArray(question.media) ? question.media[0] : question.media);

    if (media.type === 'image' || media.type === 'textOnly') {
      return <LazyLoadImage alt="media" src={media.url} className="card-image-media" onError={onError} />;
    }

    if (media.type === 'video') {
      return <MediaControlCard url={media.url} autoplay={autoplay} shouldMute={shouldMute} onError={onError} />;
    }
  };

  return (
    <>
      <div className="media-card-overflow" style={{ background: `linear-gradient(to right, ${gradient.layer0}, ${gradient.layer1})` }} >
        <p className="media-card-overflow-emoji" style={{ fontSize: OVERLAY_SPECS.EMOJI_INITIAL_FONT_SIZE + OVERLAY_SPECS.EMOJI_INITIAL_FONT_SIZE * opacity }}>{emoji}</p>
      </div>
      {mediaView()}
      <div className="media-card-question-description">
        {question.description && <QuestionDescription question={question} />}
      </div>
    </>
  );
};

export default MediaCard;
