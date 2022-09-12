import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';
import { IQuestionType } from '../../models/APIModels';
import { CARD } from '../../utils/constants';

const styles = StyleSheet.create({
  questionDescription: {
    alignSelf: 'center',
    backgroundColor: '#00080D',
    borderRadius: CARD.CARD_QUESTION_DESCRIPTION_CORNER_RADIUS_IN_PIXELS,
    width: '280px',
    height: 56,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

type QuestionDescriptionProps = {
  question: IQuestionType
}

const QuestionDescription = ({ question }: QuestionDescriptionProps) => {
  return (
    <View style={styles.questionDescription}>
      <Text margin="auto" color="white" textAlign="center" fontWeight="medium">{question.description}</Text>
    </View>
  );
};

export default QuestionDescription;
