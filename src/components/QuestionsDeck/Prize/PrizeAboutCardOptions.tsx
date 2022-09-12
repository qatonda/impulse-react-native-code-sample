import React from 'react';
import { PresenceTransition } from 'native-base';
import { useOpenURL } from '../../../hooks/useOpenURL';
import { IPrizeType } from '../../../models/APIModels';
import IButton from '../../ImpulseButton/IButton';

type PrizeAboutCardOptionsProps = {
  prize: IPrizeType;
  handleSkipPrize?: () => void;
}

export default function PrizeAboutCardOptions ({ prize, handleSkipPrize }: PrizeAboutCardOptionsProps) {
  const { openURL } = useOpenURL();
  return (
    <PresenceTransition visible={true} initial={{
      opacity: 0,
      scale: 0,
    }} animate={{
      opacity: 1,
      scale: 1,
      transition: {
        duration: 250,
      },
    }}>
      <ul>
        <li style={{ display: 'flex' }}>
          <IButton title="learn more" handleButtonPress={() => openURL(prize.aboutUrl ?? '')} />
        </li>
        <li className="display-none-content">
          <IButton title="skip" handleButtonPress={handleSkipPrize} backgroundColor="#FE0000" />
        </li>
      </ul>
    </PresenceTransition>
  );
}
