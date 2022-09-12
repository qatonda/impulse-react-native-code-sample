import React, { useState } from 'react';
import TinderCard, { Direction } from 'react-tinder-card';
import { IMediaType, IQuestionType } from '../../models/APIModels';
import { Location } from '../../models/CardModels';
import MediaCard from '../Card/MediaCard';
import ResponsePreviewComponent from './ResponsePreviewCard';

interface DeckMediaCardProps {
  overrideMediaOnError?: IMediaType;
  question: IQuestionType
  cardLocation: Location
  preventSwipeReader: () => string[]
  shouldMute: boolean
}

function DeckMediaCard (props: DeckMediaCardProps) {
  const { overrideMediaOnError, question, cardLocation, preventSwipeReader, shouldMute } = props;
  const [overrideMedia, setOverrideMedia] = useState<IMediaType | undefined>();

  const onError = () => {
    if (overrideMediaOnError) setOverrideMedia(overrideMediaOnError);
  };

  return (
    <MediaCard
      question={question}
      location={cardLocation}
      autoplay={true}
      preventSwipeReader={preventSwipeReader}
      shouldMute={shouldMute}
      onError={onError}
      overrideMedia={overrideMedia}
    />
  );
}

interface QuestionCardProps {
  question: IQuestionType;
  preventSwipeReader: () => string[];
  onSwipe: (direction: Direction) => void;
  responseMedia: IMediaType | undefined;
  shouldMute?: boolean;
  shouldBeVisible?: boolean
  overrideMediaOnError?: IMediaType | null;
}

export default function DeckQuestionCard (props: QuestionCardProps) {
  const { question, preventSwipeReader, onSwipe, shouldMute, shouldBeVisible, overrideMediaOnError } = props;
  const { responseMedia } = props;

  const [cardLocation, setCardLocation] = useState<Location>({ x: 0, y: 0 });
  const handleCardLocationMove = (x: number, y: number) => {
    setCardLocation({ x, y });
  };

  const handleSwipe = (direction: Direction) => {
    console.log('[swiped] Swiped: ', direction, question);
    setCardLocation({ x: 0, y: 0 });

    // call "delegate"
    onSwipe(direction);
  };

  return (
    <div style={{ display: shouldBeVisible ? 'inline' : 'none', backgroundColor: 'blue' }} >
      <TinderCard
        className="question-card"
        swipeRequirementType="position"
        swipeThreshold={150}
        onCardLocationChange={(x, y) => handleCardLocationMove(x, y)}
        preventSwipe={preventSwipeReader}
        onSwipe={handleSwipe}
      >
        <div className="card-media-container">
          <div className="card-media">
            <DeckMediaCard
              overrideMediaOnError={overrideMediaOnError || undefined}
              question={question}
              cardLocation={cardLocation}
              preventSwipeReader={preventSwipeReader}
              shouldMute={shouldMute || false}
            />
            <ResponsePreviewComponent
              question={question}
              preventSwipeReader={preventSwipeReader}
              response={responseMedia}
              location={cardLocation}
            />
          </div>
        </div>
      </TinderCard>
    </div>
  );
}
