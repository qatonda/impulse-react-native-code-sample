import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import Deck from '../../components/QuestionsDeck/Deck';
import Spinner from '../../components/Spinner/Spinner';
import { VoicemailEmpty, VoicemailList } from '../../components/Voicemail';
import { APIVoicemailDeck } from '../../services/api';
import { REACT_QUERY_CLIENT_KEYS } from '../../utils/constants';
import './voicemail.css';
import { useStoreActions } from '../../store/hooks';

function VoicemailMainContent() {
  const [showList, setShowList] = useState(false);

  const { isLoading, data: voicemailDeck } = useQuery(REACT_QUERY_CLIENT_KEYS.VOICEMAIL_DECK, APIVoicemailDeck);

  const hookOnEmpty = () => {
    setShowList(true);
  };

  const hookOnNewQuestions = () => {
    setShowList(false);
  };

  return (
    <>
      <Spinner visible={isLoading} />
      {voicemailDeck
        && !showList
        && (
          <Deck
            deck={voicemailDeck}
            hookOnEmpty={hookOnEmpty}
            hookOnNewQuestions={hookOnNewQuestions}
          />
        )}
      {showList && <VoicemailList />}
    </>
  );
}

export default function Voicemail() {
  const [showMainContent, setShowMainContent] = useState(false);
  const addResetFunction = useStoreActions((actions) => actions.reset.addResetFunction);
  const removeResetFunctionById = useStoreActions((actions) => actions.reset.removeResetFunctionById);

  // register the reset function
  useEffect(() => {
    const resetId = 'voicemail-reset';
    addResetFunction({
      id: resetId,
      reset: () => {
        setShowMainContent(false);
      },
    });

    return () => removeResetFunctionById(resetId);
  }, [addResetFunction, removeResetFunctionById]);

  const onButtonPressed = async () => {
    setShowMainContent(true);
  };

  return (
    <div className="voicemail-container">
      {!showMainContent &&
        <VoicemailEmpty
          description="impulse is not running a prize right now. leave a message."
          onButtonPressed={onButtonPressed}
        />
      }

      { showMainContent && <VoicemailMainContent /> }
    </div>
  );
}
