import axios from './axios';
import {ILocalMedia, IMediaType, IPrizesResponse, IPrizeType, IQuestionType, IDeckType} from '../models/APIModels';
import config from '../config';
import { UploadResponseBodyFields } from '../hooks/useMediaUpload';

const host = config.host;

export async function APIRegister(credentials: {icloud_token: string}) {
  const response = await fetch(`${host}/v1/auth/register`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(credentials),
  });

  return response.json();
}

export async function APIGetPrizes(): Promise<IPrizesResponse | undefined> {
  const response = await axios.get('/v1/prizes');
  return response.data.data;
}

export async function APIGetPrize(id: string): Promise<IPrizeType | undefined> {
  const response = await axios.get(`/v1/prizes/${id}`);
  return response.data.data;
}

export async function APIGetDeckQuestions(deckId: string): Promise<IQuestionType[]> {
  const response = await axios.get(`/v1/decks/${deckId}/questions`);
  return response.data.data;
}

export async function APIGetPrizeQuestions(prize: IPrizeType): Promise<IQuestionType[]> {
  const response = await axios.get(`/v1/prizes/${prize.id}/questions`);
  return response.data.data;
}

export async function APIGetPrizeOdds(prize: IPrizeType): Promise<any | undefined> {
  const response = await axios.get(`/v1/prizes/${prize.id}/odds`);
  return response.data.data;
}

export async function APIGetCurrentUser(): Promise<any | undefined> {
  const response = await axios.get('/v1.1/users/me');
  return response?.data?.data;
}

export async function APIGetConfigs(): Promise<any | undefined> {
  const response = await axios.get('/v1/configs');
  return response?.data?.data;
}

export async function APIResetVotes(): Promise<any | undefined> {
  const response = await axios.post('/v1/actions/votes/reset');
  return response?.data;
}

export async function APIUploadResponseMedia(params: { media: ILocalMedia, body: UploadResponseBodyFields, votedMedia: IMediaType}): Promise<any | undefined> {
  const response = await axios.post(`/v1/media/${params.votedMedia.id}`, params.body);
  return response?.data;
}

export async function APIVoteOnQuestion(params: {
  question: IQuestionType;
  vote: number;
  response?: any;
}): Promise<any> {
  const response = await axios({
    method: 'post',
    url: `/v1.2/questions/${params.question.id}/vote`,
    data: {
      vote: params.vote,
      question: params.question,
      response: params.response,
    },
  });
  return response?.data?.data;
}

export async function APIAddPrizeEntry(prizeId: string): Promise<any> {
  const response = await axios.post(`/v1/prizes/${prizeId}/entry`);
  return response?.data;
}

export async function APIVoicemailDeck(): Promise<IDeckType | undefined> {
  const response = await axios.get('/v1/voicemail/deck');
  return response.data.data;
}

export async function APIGetVoicemail(): Promise<IQuestionType[] | undefined> {
  const response = await axios.get('/v1/voicemail');
  return response.data.data;
}

export async function APIReportVoicemail(voteId: string): Promise<void> {
  const response = await axios.post(`/v1/voicemail/${voteId}/report`);
  return response.data.data;
}
