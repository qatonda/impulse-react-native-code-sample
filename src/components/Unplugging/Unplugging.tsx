import React from 'react';
import IButton from '../ImpulseButton/IButton';
import './unplugging-styles.css';

type UnpluggingProps = {
  title: string
  icon: string
  description: string
  actionTitle?: string
  handleActionPress: () => void
}

const Unplugging = ({ title, icon, description, actionTitle, handleActionPress }: UnpluggingProps) => {

  // winner picked id
  return (
    <div className="unplugged-container">
      <div className="unplugged-content">
        <p className="unplugged-title">{title}</p>
        <p className="unplugged-icon">{icon}</p>
        <p className="unplugged-description">{description}</p>
        {actionTitle &&
          <div className="unplugged-actions">
            <IButton title={actionTitle} handleButtonPress={handleActionPress} />
          </div>
        }
      </div>
    </div>
  );
};

export default Unplugging;
