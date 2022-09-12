import React, { useEffect, useState } from 'react';
import { Modal } from 'native-base';
import { IPrizeType } from '../../models/APIModels';
import './prize-odds-styles.css';
import { useNumberFormatter } from '../../hooks/useNumberFormatter';
import closeButtonImage from '../../assets/close-x.png';
import { usePrizeOdds } from '../../hooks/usePrizes';

type PrizeOddsProps = {
  prize: IPrizeType;
}

type OddsState = {
  userOdds: number; // blue one
  totalEntries: number; // red one
}

const PrizeOdds = ({ prize }: PrizeOddsProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { asString, roundToPlaces } = useNumberFormatter();
  const [odds, setOdds] = useState<OddsState>();
  const [likelyPercentWin, setLikelyPercentWin] = useState('0%');

  const { data, isRefetching, refetch } = usePrizeOdds(prize);

  useEffect(() => {
    if (data) {
      setOdds({ userOdds: data.userOdds, totalEntries: data.globalOdds });
    }
  }, [data]);

  setTimeout(() => {
    if (odds && odds?.userOdds < 3 && !isRefetching) {
      refetch();
    }
  }, 5000);

  useEffect(() => {
    if (odds) {
      const chances = odds.userOdds / odds.totalEntries * 100;
      const percent = roundToPlaces(chances, 2);
      setLikelyPercentWin(`${Math.max(percent, 0.00001)}%`);
    }
  }, [odds, prize, roundToPlaces]);

  return (
    <>
      {!modalVisible && odds && odds?.userOdds > 0 &&
        <div className="prize-odds-preview">
          <button type="button" className="total-entries-button" onClick={() => setModalVisible(true)} onTouchStart={() => setModalVisible(true)}>{odds && asString(odds.totalEntries)}</button>
          <button type="button" className="user-entries-button" onClick={() => setModalVisible(true)} onTouchStart={() => setModalVisible(true)}>{odds && asString(odds.userOdds)}</button>
        </div>
      }
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        width="100%" height="100%">
        <div className="prize-odds-container">
          <div className="prize-odds-header">
            <p className="prize-odds-description">You have a <span className="user-odds-percentage">{likelyPercentWin}</span> chance<br />of winning</p>
          </div>
          <div className="prize-odds-content">
            <div className="prize-odds-buttons">
              <button type="button" className="total-entries-button-large" onClick={() => setModalVisible(false)} onTouchStart={() => setModalVisible(false)}>{odds && asString(odds.totalEntries)}</button>
              <button type="button" className="user-entries-button-large" onClick={() => setModalVisible(false)} onTouchStart={() => setModalVisible(false)}>{odds && asString(odds.userOdds)}</button>
            </div>
          </div>
          <div className="dismiss-button-container">
            <button type="button" className="dismiss-button" onClick={() => setModalVisible(false)}>
              <img src={closeButtonImage} className="dismiss-button-image" alt="close" />
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PrizeOdds;
