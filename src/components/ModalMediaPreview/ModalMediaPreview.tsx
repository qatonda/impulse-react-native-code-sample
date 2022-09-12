import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Modal } from 'native-base';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IQuestionType } from '../../models/APIModels';
import './modal-media-preview.css';
import closeButtonImage from '../../assets/close-x.png';
import MediaControlCard from '../Media/MediaControlCard';
import { REACT_QUERY_CLIENT_KEYS, RESPONSE_MEDIA_BACKGROUND_COLOR } from '../../utils/constants';
import AudioControlCard from '../Media/AudioControlCard';
import { APIReportVoicemail } from '../../services/api';

type ModalMediaPreviewProps = {
  response: IQuestionType
  showModal: boolean
  deselectResponse: () => void
}

export const ModalMediaPreview = ({ response, showModal, deselectResponse }: ModalMediaPreviewProps) => {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const media = response.response.medium;
  const queryClient = useQueryClient();

  useEffect(() => {
    if (media) {
      setBackgroundColor(RESPONSE_MEDIA_BACKGROUND_COLOR[media.type]);
    }
  }, [media]);

  const reportResponseMutation = useMutation(REACT_QUERY_CLIENT_KEYS.VOICEMAIL_REPORT, APIReportVoicemail);

  const reportResponse = async () => {
    await reportResponseMutation.mutateAsync(response.id);
    await queryClient.refetchQueries(REACT_QUERY_CLIENT_KEYS.VOICEMAILS);
    deselectResponse();
  };

  const mediaPreview = () => {
    if (!media) return <></>;

    if (media.type === 'image' || media.type === 'textOnly') {
      return <LazyLoadImage alt="media" src={media.url} className="card-image-media" onError={() => console.error('Error loading image')} />;
    }

    if (media.type === 'video') {
      return <MediaControlCard url={media.url} autoplay={true} shouldMute={false} onError={() => console.error('Error loading image')} />;
    }

    if (media.type === 'audio') {
      return <AudioControlCard url={media.url} />;
    }
  };

  return (
    <Modal isOpen={showModal} backgroundColor={backgroundColor} onClose={deselectResponse} width="100%" height="100%">
      <div className="modal-preview-container">
        <div>
          <div className="modal-preview-media">
            {mediaPreview()}
          </div>
          <div className="modal-preview-actions-container">
            <button type="button" className="dismiss-button" onClick={deselectResponse}>
              <img src={closeButtonImage} className="dismiss-button-image" alt="cancel" />
            </button>
            <button type="button" className="report-button" onClick={reportResponse}>
              report
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
