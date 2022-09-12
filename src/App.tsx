import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { NativeBaseProvider } from 'native-base';
import StackWrapper from './screens/StackWrapper/StackWrapper';
import { useStoreState } from './store/hooks';
import AuthScreen from './screens/Auth/AuthScreen';
import './global-styles.css';
import { useIncomingURLHandler } from './hooks/useIncomingURLHandler';
import OnboardingTOSHandler from './screens/OnboardingTOSHandler/OnboardingTOSHandler';
import Voicemail from './screens/Voicemail/Voicemail';
import Settings from './components/Settings/Settings';

export default function App() {
  const authToken = useStoreState((state) => state.auth.token);
  const { getParams } = useIncomingURLHandler();
  const [incomingPrizeId, setIncomingPrizeId] = useState<string>();
  const [voicemailMode, setVoicemailMode] = useState(false);

  useEffect(() => {
    if (window.location.search) {
      const urlParams = getParams(window.location.search);
      if (urlParams.voicemailMode) {
        setVoicemailMode(urlParams.voicemailMode);
      }

      if (urlParams.prizeId) {
        setIncomingPrizeId(urlParams.prizeId);
      }
    }
  }, [getParams]);

  if (voicemailMode && authToken) {
    return <NativeBaseProvider>
      <Voicemail />
      <Settings />
    </NativeBaseProvider>;
  }

  return (
    <NativeBaseProvider>
      <Toaster />
      {/* AuthScreen handles setting the authToken */}
      {!authToken && <AuthScreen />}

      {/* post initial auth */}
      {authToken && <OnboardingTOSHandler />}
      {authToken && <StackWrapper prizeId={incomingPrizeId} />}
      <Settings />
    </NativeBaseProvider>
  );
}
