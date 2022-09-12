import React from 'react';
import { PresenceTransition } from 'native-base';
import { useOpenURL } from '../../../hooks/useOpenURL';
import IButton from '../../ImpulseButton/IButton';
import config from '../../../config';
import { IPrizeType } from '../../../models/APIModels';

export default function PrizeLegalCardOptions ({ prize }: { prize: IPrizeType }) {
  const { openURL } = useOpenURL();
  const prizeLegalUrl = `${config.host}/v1/legal/prizes/${prize.id}`;

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
        <li>
          <IButton title="sweepstakes agreement" handleButtonPress={() => openURL(prizeLegalUrl)} />
        </li>
      </ul>
    </PresenceTransition>
  );
}
