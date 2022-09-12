import {ReactChild, ReactChildren, ReactFragment, ReactPortal} from 'react';

export declare interface ILocalMedia {
  id: string
  url: string
  text?: string
  type: string // image, textOnly, video, audio
}

export declare interface IQuestionVoteResponse {
  id: string // use uuid on creation
  vote: number
  text?: string
  media: ILocalMedia
}

// this goes to backend
export declare interface IVotedQuestion {
  question: IQuestionType
  vote: number
  response: IQuestionVoteResponse
}

export declare interface IPrizesResponse {
  current: IPrizeType[]
  next: IPrizeType[]
  past: IPrizeType[]
}

export declare interface IQuestionType {
  [index: string]: any;

  id: string;
  description: string;
  createdAt: string;
  media: IMediaType[];
  isFreeResponse: boolean;
  yes_count: number;
  no_count: number;
  skip_count: number;
  decks?: IDeckType[];

  // set by the Question.ts:buildQuestion model for wild questions whose votes don't need to be
  // recorded
  ignoreRecordingVote?: boolean
}

export declare interface IPrizeType {
  [index: string]: any;

  id: string;
  name: string;
  medium: IMediaType | null;
  shortId: string | null;
  startDate: string;
  endDate: string;
  aboutUrl: string | null;
  winnerUrl: string | null;
  claimed: Boolean;
  startNotificationBold: string;
  startNotificationBody: string;
  endNotificationDate: string;
  endNotificationBold: string;
  endNotificationBody: string;
  winnerNotificationBold: string;
  winnerNotificationBody: string;
  winnerPassphrase: string;
  shortLink: string;
  price: number;
  productUrl: string;
  extra_theme: string | null;
  aboutQuestion: IQuestionType;
}

export declare interface IDeckType {
  id: string
  isPrizeDeck: boolean
  name: string
  allowedResponseTypes: string[]
  organizationId: string
  shortLink: string
  createdAt: Date
  updatedAt: Date
}

export declare interface IPrizeStats {
  numUsers: number;
  numQuestions: number;
  numVotes: number;
  percentCompleted: number;
  voteCreatedAtSeries: string[];
}

export declare type IMediaTypes = 'image' | 'video' | 'audio' | 'textOnly'

export declare interface IMediaType {
  url: string;
  id: string;
  type: IMediaTypes;
  uploaded: boolean;
}

export declare type Vote = 1 | 2 | 3 | 4;

export declare interface IVoteType {
  id: number;
  vote: Vote;
  voterId: string;
  questionId: string;
  response?: IResponseType;
}

export declare interface IResponseType {
  id: string;
  text?: string;
  medium?: IMediaType;
}

export declare interface IQuestionResponseType {
  id: string;
  vote: number;
  text?: string;
  media?: IMediaType;
}

export declare interface IPVotedQuestionType {
  question: IQuestionType;
  vote: number;
  response?: IQuestionResponseType;
}

export type ReactNode =
  | ReactChild
  | ReactChildren
  | ReactFragment
  | ReactPortal
  | boolean
  | null
  | undefined;
