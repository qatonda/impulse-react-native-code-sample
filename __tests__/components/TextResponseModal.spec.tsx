import 'react-native';
import React from 'react';
import TestRenderer, { ReactTestInstance } from 'react-test-renderer';
import TextModalButton from '../../src/components/Responses/Record/TextResponseModal';
import { questionMock } from '../helpers/mocks';
import TestRoot from '../common/TestRoot';

// SUT stands for "System Under Test" and it represents the actors that are being tested
// that are not mocks or stubs. in our case the production component `TextModalButton`
const makeSUT = (showModal: boolean, editMode: boolean = false): ReactTestInstance => {
  const root = TestRenderer.create(
    <TestRoot>
      <TextModalButton
        question={questionMock}
        handleSetMedia={() => console.log('handleSetMedia')}
        editMode={editMode}
        showModal={showModal}
        setShowModal={() => console.log('setShowModal')}
      />
    </TestRoot>,
  );

  const sut = root.root.findByType(TextModalButton);
  return sut;
};

describe('TextResponseModal', () => {
  it('TextResponseModal showModal should be false on initial load', () => {
    const showModal = false;
    const sut = makeSUT(showModal);
    expect(sut.props.showModal).toBeFalsy();
  });

  it('TextResponseModal text state should be undefined on initial load', () => {
    const showModal = true;
    const sut = makeSUT(showModal);
    expect(sut.props.text).toEqual(undefined);
  });
});
