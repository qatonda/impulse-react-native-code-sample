import React from 'react';
import './voicemail-empty.css';
import voicemailIcon from '../../../assets/voicemail-icon.png';

type VoicemailEmptyProps = {
  description: string
  onButtonPressed: () => void
}

export const VoicemailEmpty: React.FC<VoicemailEmptyProps> = ({ description, onButtonPressed }: VoicemailEmptyProps) => {
  return (
    <>
      <h3 className="empty-description">{description}</h3>
      <button className="empty-button" onClick={onButtonPressed}>
        <img className="empty-button-image" alt="leave voicemail" src={voicemailIcon} />
      </button>
    </>
  );
};
