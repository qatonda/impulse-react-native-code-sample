import React from 'react';
import TestRenderer, { ReactTestInstance } from 'react-test-renderer';
import { VoicemailEmpty } from '../../../../src/components/Voicemail';
import Providers from '../../../common/Providers';

const makeSUT = (description: string = 'impulse is not running a prize right now. leave a message.'): ReactTestInstance => {
  const sut = TestRenderer.create(
    <Providers>
      <VoicemailEmpty onButtonPressed={() => { }} description={description} />,
    </Providers>,
  );

  return sut.root;
};

describe('VoicemailEmpty Component', () => {
  it('load VoicemailEmpty with correct elements', () => {
    const expectedDescription = 'impulse is not running a prize right now. leave a message.';
    const sut = makeSUT(expectedDescription);

    const descriptionElement = sut.findByType('h3');
    const buttonElement = sut.findByType('button');
    const imageElement = sut.findByType('img');

    expect(descriptionElement.props.className).toEqual('empty-description');
    expect(buttonElement.props.className).toEqual('empty-button');
    expect(imageElement.props.className).toEqual('empty-button-image');
  });
});
