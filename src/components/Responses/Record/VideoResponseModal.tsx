import React, { useState, CSSProperties, useCallback, useEffect } from 'react';
import { Modal, Button, Center } from 'native-base';
import { View } from 'react-native';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Webcam from 'react-webcam';
import closeButtonImage from '../../../assets/close-x.png';
import ResponseModalStyles from './ResponseModal.styles';
import useToggle from '../../../hooks/camera/useToggle';
import useCamera from '../../../hooks/camera/useCamera';
import Spinner from '../../Spinner/Spinner';
import Pie from '../../CircleProgress/Pie';
import recordButtonImage from '../../../assets/record.svg';
import { CARD_RATIO, MEDIA_CAPTURE_DURATION_SECONDS } from '../../../utils/constants';
import './modal-button-styles.css';
import QuestionDescription from '../../Card/QuestionDescription';
import { IQuestionType } from '../../../models/APIModels';

const webcamVideoConstraints = {
  facingMode: 'user',
  mimeType: 'video/mp4',
  aspectRatio: CARD_RATIO,
};

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

type VideoResponseModalProps = {
  question: IQuestionType
  handleSetMedia: (url: string) => void

  showModal: boolean
  setShowModal: (showModal: boolean) => void;
}

const VideoResponseModal = ({ question, handleSetMedia, showModal, setShowModal }: VideoResponseModalProps) => {
  const [cameraRef, cameraData, cameraActions] = useCamera();
  const [loading, { off }] = useToggle(true);
  const [recording, setRecording] = useState(false);
  // const [mediaUrl, setMediaUrl] = useState<string>();
  const [secondsAmount, setSecondsAmount] = useState(MEDIA_CAPTURE_DURATION_SECONDS);

  useEffect(() => {
    if (secondsAmount <= MEDIA_CAPTURE_DURATION_SECONDS && recording) {
      updateCountdown();
    }
  }, [secondsAmount, recording]);

  const updateCountdown = () => {
    setTimeout(() => {
      setSecondsAmount(state => state + 1);
    }, 1000);
  };

  const recordedProgress = (secondsAmount * 100) / MEDIA_CAPTURE_DURATION_SECONDS;

  useEffect(() => {
    if (cameraData.recordedChunks?.length) {
      console.log('save and return video response');
      const blob = new Blob(cameraData.recordedChunks, {
        type: 'video/mp4',
      });

      const url = webkitURL.createObjectURL(blob);
      setSecondsAmount(MEDIA_CAPTURE_DURATION_SECONDS);
      cameraActions.clear();
      setShowModal(false);
      handleSetMedia(url);
    } else {
      console.log('NOT save and return video response');
    }
  }, [cameraData, cameraActions, handleSetMedia]);

  function handleStopRecording () {
    cameraActions.stopRecording();
    setRecording(false);
  }

  function handleStartRecording () {
    cameraActions.startRecording();
    setRecording(true);
    setSecondsAmount(1);
  }

  const handleMediaLoaded = useCallback(() => {
    off();
  }, [off]);

  // stop recording when modal is closed
  useEffect(() => {
    if (!showModal && recording) {
      handleStopRecording();
    }
  }, [showModal, recording, handleStopRecording]);

  return (
    <>
      {showModal &&
        <Modal isOpen={showModal} backgroundColor="#00080D" onClose={() => setShowModal(false)} size="container" height="100%">
          <View style={ResponseModalStyles.container}>
            <QuestionDescription question={question} />
            <View>
              <Center height="100%" overflow="hidden" borderRadius={30}>
                {loading && <Spinner visible={loading} />}
                <View style={ResponseModalStyles.captureContainer}>
                  <Webcam
                    ref={cameraRef}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    controls={false}
                    mirrored
                    audio
                    muted
                    videoConstraints={webcamVideoConstraints}
                    onUserMedia={handleMediaLoaded}
                  />
                </View>

                {recording &&
                  <Button
                    style={ResponseModalStyles.captureButton}
                    onTouchStart={handleStopRecording}
                    onPress={handleStopRecording}>
                    <Pie percentage={recordedProgress} colour="red" />
                  </Button>
                }
                {!recording &&
                  <Button
                    variant="unstyled"
                    onTouchStart={handleStartRecording}
                    onPress={handleStartRecording}>
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

export default VideoResponseModal;
