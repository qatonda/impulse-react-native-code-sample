import React from 'react';
import SettingsModal from './SettingsModal';
import config from '../../config';

const Settings = () => {
  if (config.env !== 'beta') return <></>;

  return (
    <div className="settings-header">
      <SettingsModal />
    </div>
  );
};

export default Settings;
