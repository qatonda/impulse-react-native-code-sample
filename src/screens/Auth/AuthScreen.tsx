import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import { Text, View } from 'react-native';
import { CircularProgress } from '@mui/material';
import AuthStyles from './AuthScreen.styles';
import { APIRegister } from '../../services/api';
import { useStoreActions } from '../../store/hooks';
import { useIncomingURLHandler } from '../../hooks/useIncomingURLHandler';

function NoAuthTokenMessage() {
  return (
    <>
      <Text style={AuthStyles.welcome}>Oh no, looks like you are not authed properly. We have dispatched a team to review the issue.</Text>
      <View style={AuthStyles.mainButton} />
    </>
  );
}

const AuthScreen = () => {
  const setAuthToken = useStoreActions((actions) => actions.auth.setToken);
  const [identity, setIdentity] = useState<string|undefined>();
  const { getParams } = useIncomingURLHandler();

  const authMutation = useMutation('register', APIRegister, {
    onSuccess: (response) => {
      if (response.data.token) {
        setAuthToken(response.data.token);
      } else {
        console.log('error', response.error);
        toast.error(response.error || 'Error while authenticating with iCloud');
      }
    },
    onError: (error) => {
      console.log('onError', error);
      toast.error(error as string ?? 'Error while authenticating with iCloud');
    },
  });

  // find the `token` param in the current url
  const queryString = window.location.search;
  const urlParams = getParams(queryString);
  useEffect(() => {
    if (urlParams.token && urlParams.token !== identity) {
      setIdentity(urlParams.token);
      authMutation.mutateAsync({ icloud_token: urlParams.token });
    }
  }, [authMutation, identity, queryString, urlParams.token]);

  return (
    <View style={AuthStyles.container}>
      <View style={AuthStyles.content}>
        {!urlParams.token && <NoAuthTokenMessage />}
        {authMutation.isLoading && <CircularProgress />}
      </View>
    </View>
  );
};

export default AuthScreen;
