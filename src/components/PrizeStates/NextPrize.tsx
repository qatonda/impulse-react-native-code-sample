import React, { useState } from 'react';
import { IPrizeType } from '../../models/APIModels';
import PrizeCountdown from './PrizeCountdown';
// import { Center } from 'native-base';
import { useOpenURL } from '../../hooks/useOpenURL';
import './prize-states-styles.css';
import { APP_STORE_URL } from '../../utils/constants';

type NextPrizeProps = {
  prizes: IPrizeType[];
}

const NextPrize = ({ prizes }: NextPrizeProps) => {
  const [nextPrize] = useState<IPrizeType>(prizes[0]);
  const { openURL } = useOpenURL();

  return (
    <div className="states-container">
      <PrizeCountdown
        prize={nextPrize}
        countdownTitle="next drop"
        countdownDate={nextPrize.startDate}
        actionTitle="download full app"
        handleActionPress={() => openURL(APP_STORE_URL.IMPULSE_APP_STORE_LINK)}
      />
    </div>
  );
};

export default NextPrize;
