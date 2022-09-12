import React, { useEffect } from 'react';
import { IDeckType } from '../../models/APIModels';
import Spinner from '../Spinner/Spinner';
import FallbackComponent from '../Fallback/FallbackComponent';
import { useDeckQuestions } from '../../hooks/usePrizes';
import BaseDeck from './Base/BaseDeck';

type DeckProps = {
  deck: IDeckType;
  hookOnNewQuestions?: () => void;
  hookOnEmpty?: () => void;
}

export default function Deck({ deck, hookOnNewQuestions, hookOnEmpty }: DeckProps) {
  const { isLoading, isError, error, data: questions, isRefetching } = useDeckQuestions(deck.id);

  useEffect(() => {
    if (!questions) return;

    if (questions.length === 0) {
      if (hookOnEmpty) hookOnEmpty();
    } else if (questions.length > 0) {
      if (hookOnNewQuestions) hookOnNewQuestions();
    }
  }, [questions, hookOnNewQuestions, hookOnEmpty]);

  return (
    <>
      <Spinner color="white" visible={isLoading || isRefetching} />
      {isError && error && <FallbackComponent error={error as Error} resetError={() => console.log('resetting error')} />}
      {questions
        && questions.length > 0
        && !isRefetching
        && (
          <BaseDeck
            questions={questions.reverse()}
            hookOnEmpty={hookOnEmpty}
          />
        )}
    </>
  );
}
