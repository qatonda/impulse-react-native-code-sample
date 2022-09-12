import React from 'react';

interface TriggerResponseModalButtonProps {
  buttonIcon: string
  onClick: () => void;
}

export default function TriggerResponseModalButton({ buttonIcon, onClick }: TriggerResponseModalButtonProps) {
  return (
    <button className="response-button" onClick={onClick} onTouchStart={onClick}>
      <img src={buttonIcon} className="response-button-image" alt="media preview" />
    </button>)
  ;
}
