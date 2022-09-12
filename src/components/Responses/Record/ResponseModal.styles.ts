import {StyleSheet} from 'react-native';
import {CARD} from '../../../utils/constants';

const ResponseModalStyles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    justifyContent: 'center',
  },

  captureButton: {
    alignSelf: 'center',
    width: '44px',
    height: '44px',
    backgroundColor: 'transparent',
    borderRadius: 8,
    margin: 10,
  },

  textCaptureButton: {
    objectFit: 'cover',
    width: 50,
    height: 50,
  },

  captureContainer: {
    width: `${CARD.CARD_WIDTH}px`,
    height: `${CARD.CARD_HEIGHT}px`,
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 2,
    borderColor: 'white',
    display: 'flex',
    borderRadius: CARD.CARD_CORNER_RADIUS_IN_PIXELS,
    overflow: 'hidden',
    justifyContent: 'center',
  },

  progressButton: {
    alignSelf: 'center',
    width: 44,
    height: 44,
    backgroundColor: 'transparent',
    borderRadius: 8,
    marginBottom: 20,
    marginTop: 20,
  },

  textArea: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '2em',
    wordBreak: 'break-word',
    resize: 'none',
    appearance: 'textfield',
    borderColor: 'transparent',
  },
});

export default ResponseModalStyles;
