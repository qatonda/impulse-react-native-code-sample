type IncominURLParams = {
  token?: string
  prizeId?: string
  isAppClip?: boolean
  voicemailMode?: boolean
}

export const useIncomingURLHandler = () => {
  const getParams = (url: string): IncominURLParams => {
    const urlParams = new URLSearchParams(url);
    return {
      token: urlParams.get('token') ?? undefined,
      prizeId: urlParams.get('prizeId') ?? undefined,
      isAppClip: !!urlParams.get('isAppClip'),
      voicemailMode: !!urlParams.get('voicemail'),
    };
  };

  return { getParams };
};
