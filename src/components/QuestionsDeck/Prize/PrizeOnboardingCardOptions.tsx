import React from 'react';
import { PresenceTransition } from 'native-base';
import { useOpenURL } from '../../../hooks/useOpenURL';
import IButton from '../../ImpulseButton/IButton';
import { ONBOARDING_SETTINGS } from '../../../utils/constants';

export default function PrizeOnboardingCardOptions () {
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
          <IButton title="replay" handleButtonPress={() => openURL(ONBOARDING_SETTINGS.ONBOARDING_WHATS_NEW_URL ?? '')} />
        </li>
      </ul>
    </PresenceTransition>
  );
}
