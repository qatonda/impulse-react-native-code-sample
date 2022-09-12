import React, { useState } from 'react';
import { Modal, Center, Button, Stack } from 'native-base';
import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import SettingsIcon from '@mui/icons-material/Settings';
import { APIResetVotes } from '../../services/api';
import { useStoreActions, useStoreState } from '../../store/hooks';

const SettingsModal = () => {
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();
  const setTOSAccepted = useStoreActions((actions) => actions.termsOfService.setAccepted);
  const setOnboardingViewed = useStoreActions((action) => action.onboarding.setViewed);
  const resetFunctions = useStoreState((state) => state.reset.resetFunctions);

  const requestVotesDeletion = async () => {
    await resetVotesMutation.mutateAsync();
    await queryClient.invalidateQueries({ refetchInactive: true });

    // call all of the registered reset functions
    resetFunctions.forEach((resetFunction) => resetFunction.reset && resetFunction.reset());
  };

  const resetVotesMutation = useMutation('reset', APIResetVotes, {
    onSuccess: (response) => {
      setShowModal(false);
      if (!response.success) {
        toast.error(response.error || 'Error resetting votes');
      }
    },
    onError: (error) => {
      setShowModal(false);
      const errorMessage = error as string;
      toast.error(errorMessage || 'Error resetting votes');
    },
  });

  const handleResetTermsOfService = () => {
    setShowModal(false);

    setTOSAccepted(false);
    setOnboardingViewed(false);
  };

  return <Center>
    <Button m={5} onPress={() => setShowModal(true)} leftIcon={<SettingsIcon htmlColor="#06b6d4" />} size="md" variant="ghost">Settings</Button>
    <Modal isOpen={showModal} onClose={() => setShowModal(false)} _backdrop={{
      _dark: {
        bg: 'black',
      },
      bg: 'black',
    }}>
      <Modal.Content maxWidth="350" maxH="212">
        <Modal.CloseButton />
        <Modal.Header>Settings</Modal.Header>
        <Modal.Body>
          <Stack mb="2.5" mt="1.5" direction="column" space={3}>
            <Button size="md" variant="ghost" onPress={requestVotesDeletion}>Delete All My Votes</Button>
            <Button size="md" variant="ghost" onPress={handleResetTermsOfService}>reset onboarding (and tos)</Button>
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  </Center>;
};

export default SettingsModal;
