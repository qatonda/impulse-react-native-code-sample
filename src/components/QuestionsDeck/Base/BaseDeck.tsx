import React, { useState, useEffect , useMemo } from 'react';
import { PresenceTransition } from 'native-base';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { Box } from '@mui/material';
import { ILocalMedia, IMediaType, IQuestionType } from '../../../models/APIModels';
import rerecordImage from '../../../assets/redo.svg';
import trashImage from '../../../assets/trashcan.svg';
import uuid from '../../../services/uuid';
import { ResponseMediaType } from '../../../models/ResponseTypes';
import { APIVoteOnQuestion } from '../../../services/api';
import useMediaUpload from '../../../hooks/useMediaUpload';
import { CARD_RATIO } from '../../../utils/constants';
import TriggerResponseModalButton from '../../Responses/Record/TriggerResponseModalButton';
import audioResponseImage from '../../../assets/audio-response.png';
import textResponseImage from '../../../assets/text-response.png';
import videoResponseImage from '../../../assets/video-response.png';
import AudioResponseModal from '../../Responses/Record/AudioResponseModal';
import VideoResponseModal from '../../Responses/Record/VideoResponseModal';
import TextResponseModal from '../../Responses/Record/TextResponseModal';
import DeckQuestionCard from '../../QuestionCard/DeckQuestionCard';
import './BaseDeck.css';

let capturedMedia: ILocalMedia | undefined;

function getResponseTriggerButtonForResponseType (responseType: ResponseMediaType, onClick: () => void, overrideButtonIcon?: string) {
  switch (responseType) {
    case ResponseMediaType.Text:
      return <TriggerResponseModalButton buttonIcon={overrideButtonIcon || textResponseImage} onClick={onClick} />;
    case ResponseMediaType.Video:
      return <TriggerResponseModalButton buttonIcon={overrideButtonIcon || videoResponseImage} onClick={onClick} />;
    case ResponseMediaType.Audio:
      return <TriggerResponseModalButton buttonIcon={overrideButtonIcon || audioResponseImage} onClick={onClick} />;
  }
}

interface BaseDeckProps {
  questions: IQuestionType[];

  // hooks
  hookAfterVote?: (question: IQuestionType) => void;
  hookOnEmpty?: () => void;

  getOptionButtonsChildren?: (question: IQuestionType | undefined) => React.ReactNode;
  getOverrideMediaOnError?: (question: IQuestionType | undefined) => IMediaType | undefined;
}

export default function BaseDeck({ questions, ...props }: BaseDeckProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const { upload } = useMediaUpload();

  const { getOptionButtonsChildren, getOverrideMediaOnError } = props;

  const optionsChildrenMemo = useMemo(() => getOptionButtonsChildren && getOptionButtonsChildren(questions[currentQuestionIndex]), [getOptionButtonsChildren, questions, currentQuestionIndex]);
  const overrideMediaOnErrorMemo = useMemo(() => getOverrideMediaOnError && getOverrideMediaOnError(questions[currentQuestionIndex]), [getOverrideMediaOnError, questions, currentQuestionIndex]);

  const onSwipe = async (currentIndex: number, direction: string, question: IQuestionType) => {
    setCurrentQuestionIndex(currentIndex - 1);

    if (!question.ignoreRecordingVote) await voteOnQuestion(question, direction);
    handleMediaDeletion();
  };

  const voteOnQuestion = async (question: IQuestionType, direction: string) => {
    const vote = getVoteDirectionInteger(direction);
    const responseIfExists = createQuestionResponse();
    console.log('responseIfExists', responseIfExists);
    await voteOnQuestionMutation.mutateAsync({ question, vote, response: responseIfExists });

    questions = questions.filter(item => item.id !== question.id);

    // call hook
    if (props.hookAfterVote) props.hookAfterVote(question);
  };

  const createQuestionResponse = () => {
    if (capturedMedia) {
      return {
        text: capturedMedia.text,
        hasMedia: !!capturedMedia,
        mediaType: capturedMedia ? capturedMedia.type : 'unknownType',
      };
    }
  };

  const voteOnQuestionMutation = useMutation('question-vote', APIVoteOnQuestion, {
    onSuccess: (response) => {
      console.log('response', response);
      if (response) {
        const medium = response.response;
        console.log('medium: ', medium);
        if (medium && medium.medium && capturedMedia) {
          upload(capturedMedia, medium.medium);
        }

        // call on finish deck hook
        if (props.hookOnEmpty && !questions[currentQuestionIndex]) props.hookOnEmpty();
      } else {
        console.log('error', response.error);
        toast.error(response.error || 'Error while voting on question');
      }
    },
    onError: (error) => {
      console.log('onError', error);
      toast.error('Error voting');
    },
  });

  const getVoteDirectionInteger = (direction: string) => {
    switch (direction) {
      case 'right':
        return 1;
      case 'left':
        return 2;
      case 'down':
        return 3;
      default:
        return 3;
    }
  };

  // Response Options
  const [responseMediaQuestionIndex, setResponseMediaQuestionIndex] = useState(-1);

  // If set to true, it will present TextResponseModal in "edit mode" and keep previously typed text response for edition
  // It should only be true when triggered from "redo" response action. If false, it tells TextResponseModal to discard last response
  const [editTextMedia, setEditTextMedia] = useState(false);
  const [textMedia, setTextMedia] = useState<IMediaType | undefined>();
  const [videoMedia, setVideoMedia] = useState<IMediaType | undefined>();
  const [audioMedia, setAudioMedia] = useState<IMediaType | undefined>();

  const [showTextModal, setShowTextModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showAudioModal, setShowAudioModal] = useState(false);

  const isResponseOptionsVisible = () => {
    return !textMedia && !videoMedia && !audioMedia;
  };

  const handleCapturedMedia = (media: string | undefined, type: ResponseMediaType, text?: string | undefined) => {
    setEditTextMedia(false);

    switch (type) {
      case 1:
        if (media) {
          const id = uuid();
          setVideoMedia({ url: media, id, type: 'video', uploaded: true });
          capturedMedia = { id, type: 'video', url: media };
          setResponseMediaQuestionIndex(currentQuestionIndex);
        } else {
          setVideoMedia(undefined);
        }
        break;
      case 2:
        if (media) {
          const id = uuid();
          setAudioMedia({ url: media, id, type: 'audio', uploaded: true });
          capturedMedia = { id, type: 'audio', url: media };
          setResponseMediaQuestionIndex(currentQuestionIndex);
        } else {
          setAudioMedia(undefined);
        }
        break;
      // text
      case 3:
        if (media) {
          const id = uuid();
          setTextMedia({ url: media, id, type: 'textOnly', uploaded: true });
          capturedMedia = { id, type: 'textOnly', url: media, text };
          setResponseMediaQuestionIndex(currentQuestionIndex);
        } else {
          setTextMedia(undefined);
        }
        break;
    }
  };

  const getReRecordResponseButton = () => {
    let responseType: ResponseMediaType | undefined;
    if (textMedia) responseType = ResponseMediaType.Text;
    else if (videoMedia) responseType = ResponseMediaType.Video;
    else if (audioMedia) responseType = ResponseMediaType.Audio;

    if (responseType) {
      return getResponseTriggerButtonForResponseType(responseType, () => {
        // delete the existing media
        handleMediaDeletion();

        // show modal
        if (textMedia) {
          setEditTextMedia(true);
          setShowTextModal(true);
        } else if (videoMedia) setShowVideoModal(true);
        else if (audioMedia) setShowAudioModal(true);
      }, rerecordImage);
    }
  };

  const handleMediaDeletion = () => {
    console.log('[BaseDeck] removing all media');
    setTextMedia(undefined);
    setVideoMedia(undefined);
    setAudioMedia(undefined);

    capturedMedia = undefined;
  };

  const preventSwipeReader = (question: IQuestionType) => {
    const responseExists = !!capturedMedia || !!textMedia || !!videoMedia || !!audioMedia;
    return (question.isFreeResponse && !responseExists) ? ['up', 'left', 'right'] : ['up'];
  };

  // set first question
  useEffect(() => {
    if (currentQuestionIndex === -1 && questions.length > 0) {
      console.log('set current question to ', (questions.length - 1));
      setCurrentQuestionIndex(questions.length - 1);
    }
  }, [currentQuestionIndex, questions]);

  if (currentQuestionIndex === -1) {
    return <div>No questions</div>;
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        alignItems: 'center',
      }}>

        <div className="questions-deck-container">
          {/* response modals */}
          {questions[currentQuestionIndex] &&
          <>
            <TextResponseModal
            showModal={showTextModal}
            setShowModal={setShowTextModal}
            editMode={editTextMedia}
            question={questions[currentQuestionIndex]}
            handleSetMedia={(url, text) => handleCapturedMedia(url, ResponseMediaType.Text, text)}
          />
            <VideoResponseModal
            showModal={showVideoModal}
            setShowModal={setShowVideoModal}
            question={questions[currentQuestionIndex]}
            handleSetMedia={(url) => handleCapturedMedia(url, ResponseMediaType.Video)}
          />
            <AudioResponseModal
            showModal={showAudioModal}
            setShowModal={setShowAudioModal}
            question={questions[currentQuestionIndex]}
            handleSetMedia={(url) => handleCapturedMedia(url, ResponseMediaType.Audio)}
          />
          </>
      }

          {/* questions deck content */}
          <div className="questions-deck-content">
            {/* see BaseDeck.css for info on why the buttons are declared before the
          question cards in the document */}
            {questions[currentQuestionIndex]?.isFreeResponse &&
            <div className="response-container">
              <PresenceTransition visible={true} initial={{
                opacity: 0,
                scale: 0,
              }} animate={{
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 250,
                },
              }}>
                {isResponseOptionsVisible() ? (
                  <ul>
                    <li>
                      {getResponseTriggerButtonForResponseType(ResponseMediaType.Text, () => setShowTextModal(true))}
                    </li>
                    <li>
                      {getResponseTriggerButtonForResponseType(ResponseMediaType.Video, () => setShowVideoModal(true))}
                    </li>
                    <li>
                      {getResponseTriggerButtonForResponseType(ResponseMediaType.Audio, () => setShowAudioModal(true))}
                    </li>
                  </ul>
                ) : (
                  <ul>
                    <li>
                      {getReRecordResponseButton()}
                    </li>
                    <li>
                      <button className="response-button" onClick={handleMediaDeletion} onTouchStart={handleMediaDeletion}>
                        <img src={trashImage} className="response-button-image" alt="discard" />
                      </button>
                    </li>
                  </ul>
                )}
              </PresenceTransition>
            </div>
            }

            {/* this is where the options go if needed */}
            { optionsChildrenMemo && optionsChildrenMemo }

            {/* dummy card to provide the rest of the cards positioning info */}
            <Box sx={{
              aspectRatio: `${CARD_RATIO}/1`,
              height: '480px',
            }}>
              {questions && questions.map((question, index) => (
                <DeckQuestionCard
                  key={question.id}
                  question={question}
                  preventSwipeReader={() => preventSwipeReader(question)}
                  onSwipe={(dir) => onSwipe(index, dir, question)}
                  shouldMute={
                    currentQuestionIndex !== index || showTextModal || showVideoModal || showAudioModal || !!textMedia || !!videoMedia || !!audioMedia
                  }
                  responseMedia={responseMediaQuestionIndex === index ? (videoMedia || audioMedia || textMedia) : undefined}
                  // will only show 3 questions: before, current, and after
                  shouldBeVisible={index + 2 > currentQuestionIndex && index - 2 < currentQuestionIndex}
                  overrideMediaOnError={overrideMediaOnErrorMemo}
                />
              ))}
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}
