import React from 'react';
import { IMediaType, IQuestionType } from '../../models/APIModels';
import ResponseMediaPreview from '../Responses/ResponseMediaPreview';
import { Location } from '../../models/CardModels';

interface ResponsePreviewComponentProps {
  response: IMediaType | undefined;
  question: IQuestionType;
  location: Location;
  preventSwipeReader: () => string[];
}

export default function ResponsePreviewComponent(props: ResponsePreviewComponentProps) {
  const { response, question, location, preventSwipeReader } = props;

  if (!response) return <></>;

  const defaultProps = { location, question, preventSwipeReader };

  return (
    <div className="card-response-media">
      <ResponseMediaPreview
        {...defaultProps}
        media={response}
      />
    </div>
  );
}
