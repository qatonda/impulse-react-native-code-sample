import React, { useEffect, useState } from 'react';
import { Link } from 'native-base';
import { useQueryClient } from 'react-query';
import Spinner from '../../components/Spinner/Spinner';
import FallbackComponent from '../../components/Fallback/FallbackComponent';
import NextPrize from '../../components/PrizeStates/NextPrize';
import usePrizes, { useAddPrizeEntry } from '../../hooks/usePrizes';
import { IPrizeType } from '../../models/APIModels';
import Unplugging from '../../components/Unplugging/Unplugging';
import './stack-wrapper-styles.css';
import EmptyPrize from '../../components/PrizeStates/EmptyPrize';
import { useOpenURL } from '../../hooks/useOpenURL';
import { APP_STORE_URL, REACT_QUERY_CLIENT_KEYS } from '../../utils/constants';
import PrizeDeck from '../../components/QuestionsDeck/Prize/PrizeDeck';
import { useConfigs } from '../../hooks/useConfigs';

type StackWrapperProps = {
  prizeId?: string
}

const StackWrapper = ({ prizeId }: StackWrapperProps) => {
  const { unplugged } = useConfigs();
  const [currentPrize, setCurrentPrize] = useState<IPrizeType | undefined>();
  const [nextPrizes, setNextPrizes] = useState<IPrizeType[]>();
  const [haveAddedEntry, setHaveAddedEntry] = useState<boolean>(false);
  const { isLoading, isError, error, data: prizes } = usePrizes();
  const { openURL } = useOpenURL();

  const queryClient = useQueryClient();
  const addPrizeEntryMutation = useAddPrizeEntry({
    onSuccess: () => {
      setHaveAddedEntry(true);
      // refresh prizes from the server
      queryClient.invalidateQueries(REACT_QUERY_CLIENT_KEYS.PRIZES);
    },
  });

  useEffect(() => {
    if (!isLoading && !isError && prizes) {
      if (prizes.current.length > 0 && !currentPrize) {
        if (prizeId) {
          const incomingUserPrize = prizes.current.find(prize => prize.id === prizeId);
          if (incomingUserPrize) {
            setCurrentPrize(incomingUserPrize);
          }
        } else {
          const currentPublicPrize = prizes.current.find(prize => prize.audience === 'public');
          if (currentPublicPrize) {
            setCurrentPrize(currentPublicPrize);
          }
        }
      } else if (prizes.next.length > 0 && !nextPrizes) {
        setNextPrizes(prizes.next);
      }
    }
  }, [currentPrize, prizes, isError, isLoading, nextPrizes, prizeId]);

  // add an entry for the prizeId if it doesn't show up in the prizes fetched
  useEffect(() => {
    if (!prizes) return;
    if (haveAddedEntry) return;

    async function addEntry (prizeIdForEntry: string) {
      await addPrizeEntryMutation.mutateAsync(prizeIdForEntry);
    }

    const allPrizes = [...prizes.current, ...prizes.next, ...prizes.past];
    if (!addPrizeEntryMutation.isLoading && prizeId && allPrizes.findIndex((p) => p.id === prizeId) === -1) {
      console.log('adding prize entry mutation');
      addEntry(prizeId);
    }
  }, [addPrizeEntryMutation, haveAddedEntry, prizeId, prizes]);

  const resetError = () => {
    console.log('error', error);
  };

  if (unplugged) {
    return <Link href={APP_STORE_URL.IMPULSE_APP_STORE_LINK} isExternal={true}><Unplugging
      title="we’re unplugging for a bit"
      icon="🔌"
      description="download our full app on and we’ll let you know when prizes resume"
      actionTitle="download full app"
      handleActionPress={() => openURL(APP_STORE_URL.IMPULSE_APP_STORE_LINK)}
    /> </Link>;
  }

  return (
    <div className="stack-wrapper">
      {isLoading && <Spinner />}
      {isError && error && <FallbackComponent error={error as Error} resetError={resetError} />}
      {currentPrize && <PrizeDeck prize={currentPrize} />}
      {nextPrizes && !currentPrize && <NextPrize prizes={nextPrizes} />}
      {!currentPrize && !nextPrizes && <EmptyPrize />}
    </div>
  );
};

export default StackWrapper;
