import React from 'react';
import './empty-list.css';

type EmptyListProps = {
  showStatus: boolean
  description: string
}

const EmptyList = ({ showStatus, description }: EmptyListProps) => {
  if (!showStatus) return <></>;

  return (
    <div className="empty-list-container">
      <h5 className="empty-list-description">{description}</h5>
    </div>
  );
};

export default EmptyList;
