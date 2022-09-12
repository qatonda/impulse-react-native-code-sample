import React from 'react';
import { TouchableOpacity } from 'react-native';
import { IQuestionType } from '../../../models/APIModels';
import './voicemail-item.css';

type VoicemailItemProps = {
  response: IQuestionType | undefined
  onPress: () => void
}

export const VoicemailItem = ({ response, onPress }: VoicemailItemProps) => {
  const createdAt = response?.createdAt;

  const formattedDate = () => {
    if (!createdAt) return 'Invalid Date';
    const date = new Date(createdAt);
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
    const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);

    return `${year}-${month}-${day}`;
  };

  const formattedTime = () => {
    if (!createdAt) return 'Invalid Time';
    return new Date(createdAt).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };

  const mediaType = response?.response.medium.type === 'textOnly' ? 'text' : response?.response.medium.type;

  return (
    <TouchableOpacity onPress={onPress}>
      <div className="item-container">
        <div className="item-left">
          <p className="item-username">anon</p>
          <p className="item-media-type">{mediaType}</p>
        </div>
        <div className="item-right">
          <p className="item-date">{formattedDate()}</p>
          <p className="item-time">{formattedTime()}</p>
        </div>
      </div>
    </TouchableOpacity>
  );
};
