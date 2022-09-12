import uuid from '../services/uuid';
import { IMediaType, IQuestionType } from './APIModels';

export const PrizeAboutQuestionId = 'prize-about-question-id';
export const PrizeLegalQuestionId = 'prize-legal-question-id';
export const PrizeOnboardingQuestionId = 'prize-onboarding-question-id';

interface BuildQuestionParams {
  // required
  description: string;
  media: IMediaType[];
  isFreeResponse: boolean;

  // optional (default values will be set otherwise)
  id?: string
  createdAt?: string,
  ignoreRecordingVote?: true,
  yes_count?: number,
  no_count?: number,
  skip_count?: number,
}

export function buildQuestion(params: BuildQuestionParams): IQuestionType {
  const now = new Date().toISOString();
  return {
    id: uuid(),
    createdAt: now,
    ignoreRecordingVote: true,
    yes_count: 0,
    no_count: 0,
    skip_count: 0,
    ...params,
  };
}
