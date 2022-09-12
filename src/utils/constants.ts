import {Dimensions} from 'react-native';

export const CARD_RATIO = 0.661538;

export const {width, height} = Dimensions.get('screen');
const maxWidth = Math.min(344, width - 46);

// if maxHeight is less than double Dimensions Height, whatto do? Marlon
let maxHeight;
if (maxWidth / CARD_RATIO > height / 2) {
  maxHeight = maxWidth / 0.75;
} else {
  maxHeight = maxWidth / CARD_RATIO;
}

export const CARD = {
  CARD_WIDTH: maxWidth,
  CARD_HEIGHT: maxHeight,
  CARD_CORNER_RADIUS_IN_PIXELS: 30,
  CARD_QUESTION_DESCRIPTION_CORNER_RADIUS_IN_PIXELS: 12,
};

export const OVERLAY_COLORS = {
  SKIP_LAYER0: '#F3EFEE',
  SKIP_LAYER1: '#FFFFFF',
  YES_LAYER0: '#0089DE',
  YES_LAYER1: '#40E8FF',
  NO_LAYER0: '#FFB626',
  NO_LAYER1: '#FB0602',
};

export const OVERLAY_EMOJIS = {
  OVERLAY_SKIP: '🤷‍♂️',
  OVERLAY_YES: '😎',
  OVERLAY_NO: '😐',
};

export const OVERLAY_SPECS = {
  EMOJI_INITIAL_FONT_SIZE: 60,
};

export const MEDIA_CAPTURE_DURATION_SECONDS = 20;

export const ONBOARDING_SETTINGS = {
  TERMS_OF_USE_URL: 'https://www.askimpulse.com/terms-of-use',
  // the following onboarding URL is also hard-coded into the app-clip and this webpage is not
  // shown, instead we show a video modal instead. do not change this url without first
  // understanding it's relationship to the app-clip written in swift.
  ONBOARDING_WHATS_NEW_URL: 'https://impulsehq.webflow.io/new-feature-notes/whats-new',
  AGREED_TO_TOS: 'agreed_to_terms_of_service',
  VIEWED_INFO_SCREEN: 'viewed_info_screen',
};

export const WEBFLOW_URLS = {
  SUGGEST_DROP: 'https://impulsehq.webflow.io/shelf/suggest-a-prize',
};

export const REACT_QUERY_CLIENT_KEYS = {
  PRIZE_QUESTIONS: 'prize-questions',
  PRIZE_ODDS: 'prize-odds',
  PRIZE_ENTRY: 'prize-entry',
  PRIZES: 'impulse-prizes',
  VOICEMAILS: 'voicemails-list',
  VOICEMAIL_DECK: 'voicemail-deck',
  VOICEMAIL_REPORT: 'voicemail-report',
  VOICEMAIL_DECK_QUESTIONS: 'voicemail-deck-questions',

  DECK_QUESTIONS: (deckId: string) => ['deck-questions', deckId],
};

export const RESPONSES_STYLES = {
  AUDIO_RESPONSE_BACKGROUND_COLOR: '#FFC10C',
  VIDEO_RESPONSE_BACKGROUND_COLOR: '#00080D',
  TEXT_RESPONSE_BACKGROUND_COLOR: '#007ACC',
};



export const RESPONSE_MEDIA_BACKGROUND_COLOR: {[type: string]: string}  = {
  'video': RESPONSES_STYLES.VIDEO_RESPONSE_BACKGROUND_COLOR,
  'image': RESPONSES_STYLES.TEXT_RESPONSE_BACKGROUND_COLOR,
  'textOnly': RESPONSES_STYLES.TEXT_RESPONSE_BACKGROUND_COLOR,
  'text': RESPONSES_STYLES.TEXT_RESPONSE_BACKGROUND_COLOR,
  'audio': RESPONSES_STYLES.AUDIO_RESPONSE_BACKGROUND_COLOR,
};

export const APP_STORE_URL = {
  IMPULSE_APP_STORE_LINK: 'https://apps.apple.com/us/app/impulse-anonymous-feedback/id1182836030',
};
