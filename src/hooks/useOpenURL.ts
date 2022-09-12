import { useIncomingURLHandler } from './useIncomingURLHandler';

export const useOpenURL = () => {
  const { getParams } = useIncomingURLHandler();
  const params = getParams(window.location.search);
  const isAppClip = !!params.isAppClip;

  const openURL = async (url: string) => {
    // if we're in an app-clip, we add the url to an anchor on the current location so that the native
    // code can open the url within the app-clip and not launch safari
    if (isAppClip) {
      let location = window.location.href;
      if (location.indexOf('#') === -1) {
        location = `${location}#`;
      }
      const newLocation = location.replace(/#.*/, `#${url}`);
      window.open(newLocation, '_self');
    } else {
      window.open(url, '_blank');
    }

    // TODO: implement react-native.Linking.canOpenURL() and ...openURL() so the user can open apps
    // on the same device directly.
  };
  return { openURL };
};
