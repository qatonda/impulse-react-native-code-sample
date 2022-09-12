import React from 'react';
import IButton from '../ImpulseButton/IButton';
import './empty-prize-styles.css';
import stateEmoji from '../../assets/empty-emoji.png';
import { useOpenURL } from '../../hooks/useOpenURL';
import { APP_STORE_URL } from '../../utils/constants';

const EmptyPrize = () => {
  const { openURL } = useOpenURL();

  // winner picked id
  return (
    <div className="empty-prize-container">
      <div className="empty-prize-content">
        <p className="empty-prize-title">what should we give away next</p>
        <img src={stateEmoji} className="empty-prize-icon" alt="state emoji" />
        <div className="empty-prize-actions">
          <IButton title="download full app" handleButtonPress={() => openURL(APP_STORE_URL.IMPULSE_APP_STORE_LINK)} />
        </div>
      </div>
    </div>
  );
};

export default EmptyPrize;
