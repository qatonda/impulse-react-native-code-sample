import React, { useState, CSSProperties } from 'react';
import { Modal, Button } from 'native-base';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import TextareaAutosize from 'react-textarea-autosize';
import closeButtonImage from '../../../assets/close-x.png';
import './modal-response-capture.css';
import QuestionDescription from '../../Card/QuestionDescription';
import { IQuestionType } from '../../../models/APIModels';
import arrowEnabledButtonImage from '../../../assets/continue.svg';
import arrowDisabledButtonImage from '../../../assets/continue-disabled.svg';

const arrowImageStyle: CSSProperties = {
  objectFit: 'cover',
  width: 50,
  height: 50,
};

type TextResponseModalProps = {
  question: IQuestionType
  handleSetMedia: (url: string, text: string) => void
  editMode: boolean

  showModal: boolean
  setShowModal: (showModal: boolean) => void;
}

function addElement(value: string, valueToAdd: string, delimiter: string) {
  // if value is not empty, then add delimiter after
  return `${value ? `${value}${delimiter}` : ''}${valueToAdd}`;
}

/**
 * Splits the string array into an array of strings of length `maxLength` measure by the context.
 * New elements are added with the given delimiter.
 *
 * Example:
 * ```
 * let canvas = ...;
 * let context = canvas.getContext('2d');
 *
 * // setup text style via context
 *
 * let str = 'some words are wayyyyyy too long'.split(' ');
 * let result = splitStringArrayByMaxLength(str, ' ', context, 7)
 *
 * result // => ["some", "words", "are", "wayyyy", "yy", "too", "long"]
 * ```
 */
function splitStringArrayByMaxLength(values: string[], delimiter: string, context: any, maxWidth: number) {
  const comps = [];
  let component = '';
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const element = values.shift();
    if (!element) break;

    const componentLengthWithNext = context.measureText(addElement(component, element, delimiter)).width;

    if (componentLengthWithNext > maxWidth) {
      comps.push(component);
      component = element;
    } else {
      component = addElement(component, element, delimiter);
    }
  }
  // push the last line
  comps.push(component);

  return comps;
}

/**
 * Return an array of lines that fit within the given width of the given context. The individual
 * words are evaluated for being too long for a single line, in which case we take the `word-break:
 * break-all` approach by breaking at any character.
 */
function getTextLines(context: any, text: string, maxWidth: number) {
  // split and trim the words
  let words: string[] = text.split(' ').map(word => word.trim()).filter(word => !!word);

  // split the words by their max length if a word is too long for a single line
  words = words.map(x => splitStringArrayByMaxLength(x.split(''), '', context, maxWidth)).flat();

  // break the words up by maxWidth line
  return splitStringArrayByMaxLength(words, ' ', context, maxWidth);
}

function writeTextLines(context: any, lines: string[], x: number, y: number, lineHeight: number) {
  lines.forEach(line => {
    context.fillText(line, x, y);
    y += lineHeight;
  });
}

/**
 * Returns a blob url to text response image data drawn from the given text.
 */
function getImageFromText(text: string): string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('unable to get canvas context.');

  // the size of the canvas is determined by the general size of the question cards. the sizes are
  // multiplied by two to account for retina screens for a less blurry result.
  // https://stackoverflow.com/a/15666143/1104126
  const size = { width: 318 * 2, height: 480 * 2 };
  canvas.width = size.width;
  canvas.height = size.height;

  // blue background
  ctx.fillStyle = '#007ACC';
  ctx.fillRect(0, 0, size.width, size.height);

  // text style
  ctx.font = '70px -apple-system';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFFFFF';

  // draw the text in the middle of the canvas
  const maxWidth = size.width - 20;
  const lineHeight = 80;

  const lines = getTextLines(ctx, text, maxWidth);
  const linesHeight = lines.length * lineHeight;

  // determine the x and y position of the text given the line height

  // the canvas draws the y coordinate under the first line, so we have to add the height of the
  // first line to compensate.
  const y = (canvas.height / 2) - (linesHeight / 2) + lineHeight;
  const x = canvas.width / 2;

  // draw the text
  writeTextLines(ctx, lines, x, y, lineHeight);

  const imageData = canvas.toDataURL('image/jpeg');
  const blob = new Blob([imageData], { type: 'image/jpeg' });
  return webkitURL.createObjectURL(blob);
}

const TextResponseModal = ({ question, handleSetMedia, editMode, showModal, setShowModal }: TextResponseModalProps) => {
  const [text, setText] = useState<string | undefined>();
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  const isActive = () => {
    return text !== '' && text !== undefined;
  };

  const handleSetTextMedia = () => {
    setShowModal(false);
    if (text) {
      const imageUrl = getImageFromText(text);
      handleSetMedia(imageUrl, text);
    }
  };

  const updateCursorPosition = () => {
    if (text && text.length > 0 && textareaRef.current) {
      textareaRef.current.selectionStart = text.length;
    }
  };

  return (
    <>
      {showModal && <Modal isOpen={showModal} backgroundColor="#007ACC" onClose={() => setShowModal(false)} width="100%" height="100%">
        <div className="capture-response-container">
          <div>
            <div className="capture-response-header">
              <QuestionDescription question={question} />
            </div>
            <div className="capture-response-content">
              <div className="capture-response-input">
                <TextareaAutosize
                  ref={textareaRef}
                  onFocus={updateCursorPosition}
                  cacheMeasurements={false}
                  defaultValue={editMode ? text : ''}
                  maxLength={100}
                  placeholder="what do you think"
                  onChange={ev => setText(ev.target.value)}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    textAlign: 'center',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: 'white',
                    fontSize: '2em',
                    width: '100%',
                    wordBreak: 'break-word',
                    resize: 'none',
                    appearance: 'textfield',
                    borderColor: 'transparent',
                    outline: 'none',
                  }}

                />
              </div>
            </div>
            <div className="capture-response-actions-container">
              <Button
                variant="unstyled"
                disabled={!isActive()}
                onPress={handleSetTextMedia}>
                <LazyLoadImage src={isActive() ? arrowEnabledButtonImage : arrowDisabledButtonImage} style={arrowImageStyle} />
              </Button>
              <button type="button" className="dismiss-button" onClick={() => setShowModal(false)}>
                <img src={closeButtonImage} className="dismiss-button-image" alt="cancel" />
              </button>
            </div>
          </div>
        </div>
      </Modal>}
    </>
  );
};

export default TextResponseModal;
