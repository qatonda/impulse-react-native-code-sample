import React, { useState, CSSProperties, useEffect } from 'react';
import { Modal, Button, Center } from 'native-base';
import { View } from 'react-native';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import closeButtonImage from '../../../assets/close-x.png';
import ResponseModalStyles from './ResponseModal.styles';
// @ts-ignore
import Pie from '../../CircleProgress/Pie';
import recordButtonImage from '../../../assets/record.svg';
import { MEDIA_CAPTURE_DURATION_SECONDS } from '../../../utils/constants';
import './modal-button-styles.css';
import QuestionDescription from '../../Card/QuestionDescription';
import { IQuestionType } from '../../../models/APIModels';
import useRecorder from '../../../audio/hooks/use-recorder';
import AudioVisualizer from '../../../audio/audio-visualizer';

const recordButtonImageStyle: CSSProperties = {
  objectFit: 'cover',
  width: 50,
  height: 50,
};

const closeImageStyle: CSSProperties = {
  objectFit: 'cover',
  width: '40px',
  height: '40px',
};

type AudioResponseModalProps = {
  question: IQuestionType
  handleSetMedia: (url: string) => void

  showModal: boolean
  setShowModal: (showModal: boolean) => void;
}

const AudioResponseModal = ({ question, handleSetMedia, showModal, setShowModal }: AudioResponseModalProps) => {
  const [secondsAmount, setSecondsAmount] = useState(MEDIA_CAPTURE_DURATION_SECONDS);
  const [audioAnalyser, setAudioAnalyser] = useState<AnalyserNode | undefined>();

  const { recorderState, startRecording, cancelRecording, saveRecording } = useRecorder();

  useEffect(() => {
    if (recorderState.recordingSeconds <= MEDIA_CAPTURE_DURATION_SECONDS && recorderState.mediaRecorder?.state === 'recording') {
      const timeout = setTimeout(() => {
        setSecondsAmount(state => state + 1);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [secondsAmount, recorderState.recordingSeconds, recorderState.mediaRecorder?.state]);

  const recordedProgress = (secondsAmount / MEDIA_CAPTURE_DURATION_SECONDS) * 100;

  const toggleRecordingState = () => {
    if (recorderState.mediaRecorder?.state === 'recording') {
      saveRecording();
    } else {
      startRecording();
      setSecondsAmount(0);
    }
  };

  useEffect(() => {
    if (recorderState.audio) {
      setAudioAnalyser(undefined);
      setShowModal(false);
      handleSetMedia(recorderState.audio);
    }
  }, [recorderState.audio]);

  // stop recording when modal is closed
  useEffect(() => {
    if (!showModal && recorderState.mediaRecorder?.state === 'recording') {
      toggleRecordingState();
    }
  }, [showModal, recorderState.mediaRecorder?.state]);

  // setup audio analyser
  useEffect(() => {
    if (recorderState.mediaStream && !audioAnalyser) {
      const audioContext = new AudioContext();
      const analyzer = audioContext.createAnalyser();

      const audioInput = audioContext.createMediaStreamSource(recorderState.mediaStream);
      audioInput.connect(analyzer);

      setAudioAnalyser(analyzer);
    }
  }, [audioAnalyser, recorderState.mediaStream]);

  return (
    <>
      {showModal &&
        <Modal isOpen={showModal} backgroundColor="#FFC10C" onClose={() => setShowModal(false)} size="container" height="100%">
          <View style={ResponseModalStyles.container}>
            <QuestionDescription question={question} />
            <View>
              <Center height="100%" overflow="hidden" borderRadius={30}>
                <View style={ResponseModalStyles.captureContainer}>
                  {audioAnalyser &&
                    <AudioVisualizer
                      analyser={audioAnalyser}
                    />}
                </View>

                {recorderState.mediaRecorder?.state === 'recording' &&
                  <Button style={ResponseModalStyles.captureButton} onTouchStart={toggleRecordingState} onPress={toggleRecordingState}>
                    <Pie percentage={recordedProgress} colour="red" />
                  </Button>
                }
                {!(recorderState.mediaRecorder?.state === 'recording') &&
                  <Button
                    variant="unstyled"
                    onPress={toggleRecordingState}>
                    <LazyLoadImage src={recordButtonImage} style={recordButtonImageStyle} />
                  </Button>
                }
              </Center>
            </View>
            <Button
              variant="unstyled"
              onPress={() => setShowModal(false)}>
              <LazyLoadImage src={closeButtonImage} style={closeImageStyle} />
            </Button>
          </View>
        </Modal>
      }
    </>
  );
};

export default AudioResponseModal;
