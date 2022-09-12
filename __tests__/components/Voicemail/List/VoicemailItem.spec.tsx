import React from 'react';
import TestRenderer, { ReactTestInstance } from 'react-test-renderer';
import { VoicemailItem } from '../../../../src/components/Voicemail';
import { IQuestionType } from '../../../../src/models/APIModels';
import Providers from '../../../common/Providers';
import { voicemailResponseMock } from '../../../helpers/mocks';

const makeSUT = (response: IQuestionType): ReactTestInstance => {
  const sut = TestRenderer.create(
    <Providers>
      <VoicemailItem response={response} onPress={() => console.log('has selected item')} />
    </Providers>,
  );

  return sut.root;
};

describe('VoicemailItem Component', () => {
  it('load VoicemailItem with correct elements', () => {
    const sut = makeSUT(voicemailResponseMock);

    const usernameElement = sut.findByProps({ className: 'item-username' });

    expect(usernameElement).toBeTruthy();
  });
});
