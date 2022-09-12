import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useOpenURL } from '../../../hooks/useOpenURL';
import { useAddPrizeEntry } from '../../../hooks/usePrizes';
import { IMediaType, IPrizeType, IQuestionType } from '../../../models/APIModels';
import { buildMedia } from '../../../models/Media';
import { buildQuestion, PrizeAboutQuestionId, PrizeLegalQuestionId, PrizeOnboardingQuestionId } from '../../../models/Question';
import FallbackComponent from '../../Fallback/FallbackComponent';
import Spinner from '../../Spinner/Spinner';
import SweepstakesAgreementImage from '../../../assets/sweepstakes_agreement.jpg';
import PrizeCountdown from '../../PrizeStates/PrizeCountdown';
import { APP_STORE_URL, REACT_QUERY_CLIENT_KEYS } from '../../../utils/constants';
import PrizeOdds from '../../PrizeOdds/PrizeOdds';
import './prize-deck.css';
import OnboardingInitialCard from '../../../assets/onboarding-initial-card.jpg';
import BaseDeck from '../Base/BaseDeck';
import PrizeAboutCardOptions from './PrizeAboutCardOptions';
import PrizeLegalCardOptions from './PrizeLegalCardOptions';
import PrizeOnboardingCardOptions from './PrizeOnboardingCardOptions';
import { APIGetPrizeQuestions } from '../../../services/api';

function getPrePrizeQuestions(prize: IPrizeType) {
  // build the about question
  const useAboutQuestionVideo = !!prize.aboutQuestion;
  const mediaUrl = useAboutQuestionVideo ? prize.aboutQuestion.media[0].url : prize.medium?.url;
  const aboutQuestionMedia = buildMedia({
    url: mediaUrl || '', // TODO: add placeholder url here (maybe the impulse logo?)
    type: useAboutQuestionVideo ? 'video' : 'image',
  });
  const aboutQuestion = buildQuestion({
    id: prize.aboutQuestion?.id ?? PrizeAboutQuestionId,
    description: '',
    media: [aboutQuestionMedia],
    isFreeResponse: false,
  });

  // build the onboarding question
  const onboardingInitialCard = buildQuestion({
    id: PrizeOnboardingQuestionId,
    description: '',
    media: [buildMedia({
      url: OnboardingInitialCard,
      type: 'image',
    })],
    isFreeResponse: false,
  });

  // build the legal question
  const legalQuestionMedia = buildMedia({
    url: SweepstakesAgreementImage,
    type: 'image',
  });
  const legalQuestion = buildQuestion({
    id: PrizeLegalQuestionId,
    description: '',
    media: [legalQuestionMedia],
    isFreeResponse: false,
  });

  return [onboardingInitialCard, aboutQuestion, legalQuestion];
}

/**
 * This function returns the prize questions. It gets the remote questions for the prize and then if
 * needed adds the pre-prize questions before the remote questions.
 */
const usePrizeQuestions = (prize: IPrizeType) => {
  const [questions, setQuestions] = useState<IQuestionType[] | undefined>();
  const prePrizeQuestions = React.useMemo(() => getPrePrizeQuestions(prize), [prize]);

  const queryKey = [REACT_QUERY_CLIENT_KEYS.PRIZE_QUESTIONS, prize];
  const { data, ...rest } = useQuery(queryKey, () => APIGetPrizeQuestions(prize));

  useEffect(() => {
    if (!data) {
      setQuestions(undefined);
    } else if (data.length === 0) {
      setQuestions([]);
    } else {
      setQuestions([...prePrizeQuestions, ...data].reverse());
    }
  }, [data, prePrizeQuestions]);

  return {
    request: { questions, ...rest },
    queryKey,
  };
};

function getOptionButtonsChildren(question: IQuestionType | undefined, prize: IPrizeType): React.ReactNode {
  if (!question) return <></>;

  const isPrizeAboutQuestion = question.id === prize.aboutQuestion?.id || question.id === PrizeAboutQuestionId;
  const isPrizeLegalQuestion = question && question.id === PrizeLegalQuestionId;
  const isPrizeOnboardingQuestion = question && question.id === PrizeOnboardingQuestionId;

  // if is none of them, return nothing
  if (!isPrizeAboutQuestion && !isPrizeLegalQuestion && !isPrizeOnboardingQuestion) return <></>;

  return (
    <>
      <div className="response-container">
        { isPrizeAboutQuestion && <PrizeAboutCardOptions prize={prize} /> }
        { isPrizeLegalQuestion && <PrizeLegalCardOptions prize={prize} /> }
        { isPrizeOnboardingQuestion && <PrizeOnboardingCardOptions /> }
      </div>
    </>
  );
}

function getOverrideMediaOnError(question: IQuestionType | undefined, prize: IPrizeType): IMediaType | undefined {
  if (!question) return undefined;

  const isPrizeAboutQuestion = question.id === prize.aboutQuestion?.id || question.id === PrizeAboutQuestionId;

  if (isPrizeAboutQuestion) {
    return prize.medium || undefined;
  }
  return undefined;
}

function isQuestionInPrizeDeck(question: IQuestionType, prize: IPrizeType): boolean {
  const deckQuestions = question.decks?.filter((deck: { id: string; }) => deck.id === prize.id);
  return deckQuestions?.length !== 0;
}

interface PrizeDeckProps {
  prize: IPrizeType;
}

export default function PrizeDeck({ prize }: PrizeDeckProps) {
  const { openURL } = useOpenURL();
  const queryClient = useQueryClient();

  const addPrizeEntryMutation = useAddPrizeEntry();

  const { queryKey, request } = usePrizeQuestions(prize);
  const { isLoading, isError, error, questions, isRefetching } = request;

  return (
    <>
      <div className="prize-odds-mini-preview">
        <PrizeOdds prize={prize} />
      </div>
      <Spinner color="white" visible={isRefetching || isLoading} />
      {isError && error && <FallbackComponent error={error as Error} resetError={() => console.log(error)} />}
      {questions
        && questions.length > 0
        && !isRefetching
        && (
          <BaseDeck
            questions={questions}
            hookAfterVote={async (question) => {
              // make sure to add the prize entry
              if (isQuestionInPrizeDeck(question, prize)) {
                await addPrizeEntryMutation.mutateAsync(prize.id);
              }
            }}
            hookOnEmpty={() => {
              queryClient.refetchQueries(queryKey);
            }}
            getOptionButtonsChildren={(question) => getOptionButtonsChildren(question, prize)}
            getOverrideMediaOnError={(question) => getOverrideMediaOnError(question, prize)}
          />
        )}
      {questions?.length === 0
        && !isRefetching
        && (
          <PrizeCountdown
            prize={prize}
            countdownTitle="winner picked in"
            countdownDate={prize.endDate}
            actionTitle="download full app"
            handleActionPress={() => openURL(APP_STORE_URL.IMPULSE_APP_STORE_LINK)}
          />
        )}
    </>
  );
}
