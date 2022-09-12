import { useMutation , useQuery } from 'react-query';
import { IPrizeType } from '../models/APIModels';
import { APIGetPrizes, APIGetPrize, APIGetPrizeOdds, APIAddPrizeEntry, APIGetVoicemail, APIGetDeckQuestions } from '../services/api';
import { REACT_QUERY_CLIENT_KEYS } from '../utils/constants';

const usePrizes = () => {
  return useQuery(REACT_QUERY_CLIENT_KEYS.PRIZES, APIGetPrizes);
};

export const usePrizeWithId = (id: string) => {
  return useQuery('impulse-prize', () => APIGetPrize(id));
};

export const useDeckQuestions = (deckId: string) => {
  return useQuery(REACT_QUERY_CLIENT_KEYS.DECK_QUESTIONS(deckId), () => APIGetDeckQuestions(deckId));
};

export const usePrizeOdds = (prize: IPrizeType) => {
  return useQuery(REACT_QUERY_CLIENT_KEYS.PRIZE_ODDS, () => APIGetPrizeOdds(prize));
};

export const useAddPrizeEntry = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  return useMutation(REACT_QUERY_CLIENT_KEYS.PRIZE_ENTRY, APIAddPrizeEntry, { onSuccess });
};

export const useVoicemails = () => {
  return useQuery(REACT_QUERY_CLIENT_KEYS.VOICEMAILS, () => APIGetVoicemail);
};

export default usePrizes;
