import React from 'react';
import './ibutton-styles.css';

type IButtonProps = {
  title: string
  backgroundColor?: string
  handleButtonPress?: () => void
}

const IButton = ({ title, handleButtonPress, backgroundColor = '#007ACC' }: IButtonProps) => {
  return <button className="ibutton" onClick={handleButtonPress} style={{ backgroundColor }}>
    <p className="title">{title}</p>
  </button>;
};

export default IButton;
