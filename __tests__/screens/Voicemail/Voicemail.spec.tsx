import React from 'react';
import TestRenderer, { ReactTestInstance } from 'react-test-renderer';
import Voicemail from '../../../src/screens/Voicemail/Voicemail';
import { VoicemailEmpty } from '../../../src/components/Voicemail';
import Providers from '../../common/Providers';

const makeSUT = (): ReactTestInstance => {
  const sut = TestRenderer.create(
    <Providers>
      <Voicemail />
    </Providers>,
  );

  return sut.root;
};

describe('Voicemail Screen', () => {
  it('load Voicemail shows VoicemailEmpty by default', () => {
    const sut = makeSUT();

    const empty = sut.findAllByType(VoicemailEmpty);

    expect(empty).toBeTruthy();
  });

  it('show VoicemailDeck on prize load', () => {
    const sut = makeSUT();

    expect(sut.props.prize).toBe(undefined);
  });
});
