import React from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import { Heading } from 'native-base';
import { useQueryClient } from 'react-query';
import { IPrizeType } from '../../models/APIModels';
import IButton from '../ImpulseButton/IButton';
import { REACT_QUERY_CLIENT_KEYS } from '../../utils/constants';

type PrizeCountdownProps = {
  prize: IPrizeType
  countdownTitle: string
  countdownDate: string
  actionTitle?: string
  handleActionPress: () => void
}

type CountdownProps = {
  days: number
  hours: number
  minutes: number
  seconds: number
  completed: boolean
}

// Renderer callback with condition
const Completionist = () => <span>You are good to go!</span>;
const renderer = ({ days, hours, minutes, seconds, completed }: CountdownProps) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <Heading textAlign="center" alignSelf="center" fontSize="30" color="#F60000">
        {zeroPad(hours + (days * 24))}h {zeroPad(minutes)}m {zeroPad(seconds)}s
      </Heading>
    );
  }
};

const PrizeCountdown = ({ prize, countdownTitle, countdownDate, actionTitle, handleActionPress }: PrizeCountdownProps) => {
  const queryClient = useQueryClient();
  const refetchPrize = async () => {
    // TODO: refetch prize
    await queryClient.refetchQueries(REACT_QUERY_CLIENT_KEYS.PRIZE_QUESTIONS);
  };

  // winner picked id
  return (
    <div className="state-content">
      <p className="state-title">{countdownTitle}</p>
      <Countdown date={countdownDate} renderer={renderer} onComplete={refetchPrize} />
      <img src={prize.medium?.url} className="state-icon" alt="prizeimage" />
      <div className="state-actions">
        {actionTitle && <IButton title={actionTitle} handleButtonPress={handleActionPress} />}
      </div>
    </div>
  );
};

export default PrizeCountdown;
