import React from 'react';
import IBulletinBoard from '../../components/BuletinBoard/IBulletinBoard';
import { useOpenURL } from '../../hooks/useOpenURL';
import { useStoreActions, useStoreState } from '../../store/hooks';
import { ONBOARDING_SETTINGS } from '../../utils/constants';

const OnboardingTOSHandler = () => {
  const { openURL } = useOpenURL();

  const tosAccepted = useStoreState((state) => state.termsOfService.accepted);
  const setTOSAccepted = useStoreActions((actions) => actions.termsOfService.setAccepted);
  const onboardingViewed = useStoreState((state) => state.onboarding.viewed);
  const setOnboardingViewed = useStoreActions((action) => action.onboarding.setViewed);

  // don't return anything if the terms of service have been accepted
  if (tosAccepted && onboardingViewed) {
    return <></>;
  }

  const handleSubmit = () => {
    setTOSAccepted(true);

    if (!onboardingViewed) {
      setTimeout(() => {
        openURL(ONBOARDING_SETTINGS.ONBOARDING_WHATS_NEW_URL);
        setOnboardingViewed(true);
      }, 1000);
    }
  };
  const handleCancel = () => {
    openURL(ONBOARDING_SETTINGS.TERMS_OF_USE_URL);
  };

  return (
    <IBulletinBoard
      shouldTrigger={!tosAccepted}
      confirmActionTitle="I agree"
      body="By using Impulse, you agree to the Terms of Service"
      onConfirmAction={handleSubmit}
      cancelActionTitle="See Terms of Service"
      onCancelAction={handleCancel}
    />
  );
};

export default OnboardingTOSHandler;
