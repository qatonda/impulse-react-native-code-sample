import React, { useState, useEffect } from 'react';
import { Modal, Button, Link } from 'native-base';
import IButton from '../ImpulseButton/IButton';
import './ibulletin-board-styles.css';

type IBulletinBoardProps = {
  triggerTitle?: string;
  shouldTrigger: boolean;
  confirmActionTitle: string;
  body: string;
  onConfirmAction: () => void;
  cancelActionTitle: string;
  onCancelAction?: () => void;
};

const IBulletinBoard = ({
  triggerTitle,
  shouldTrigger,
  confirmActionTitle,
  body,
  onConfirmAction,
  cancelActionTitle,
  onCancelAction,
}: IBulletinBoardProps) => {
  const placement = 'bottom';
  const [modalVisible, setModalVisible] = useState(false);

  // if there's no button title, then immediately show the model
  useEffect(() => {
    if (!triggerTitle && shouldTrigger && !modalVisible) {
      setModalVisible(true);
    }
  }, [triggerTitle, shouldTrigger, modalVisible]);

  const handleTriggerAction = () => {
    setModalVisible(shouldTrigger);
    if (!shouldTrigger) {
      onConfirmAction();
    }
  };

  return (
    <>
      {triggerTitle && <IButton title={triggerTitle} handleButtonPress={handleTriggerAction} />}
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        mt={12}
        w="100%">
        <Modal.Content maxWidth="90vw" width="400px" height="300" {...styles[placement]}>
          <Modal.Body>
            <div className="bulletin-container">
              <p className="bulletin-icon">🗃️</p>
              <p className="bulletin-description">
                {body}
              </p>
              <div className="bulletin-actions">
                <div className="bulletin-confirm-action">
                  <IButton
                    title={confirmActionTitle}
                    handleButtonPress={() => {
                      onConfirmAction();
                      setModalVisible(false);
                    }}
                  />
                </div>
                <div className="bulletin-cancel-action">
                  <Button
                    variant="ghost"
                    colorScheme="blueGray"
                    onPress={() => {
                      onCancelAction ? onCancelAction() : null;
                    }}>
                    {cancelActionTitle}
                  </Button>
                </div>
              </div>
            </div>
            <div />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default IBulletinBoard;

const styles = {
  bottom: {
    marginBottom: 16,
    marginTop: 'auto',
  },
};
