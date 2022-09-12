import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { useQuery } from 'react-query';
import { VoicemailItem } from './VoicemailItem';
import './voicemail-list.css';
import Spinner from '../../Spinner/Spinner';
import { IQuestionType } from '../../../models/APIModels';
import { APIGetVoicemail } from '../../../services/api';
import { REACT_QUERY_CLIENT_KEYS } from '../../../utils/constants';
import { ModalMediaPreview } from '../../ModalMediaPreview/ModalMediaPreview';
import EmptyList from '../../EmptyList/EmptyList';

export const VoicemailList = () => {
  const [responses, setResponses] = useState<IQuestionType[] | undefined>();
  const [selectedResponse, setSelectedResponse] = useState<IQuestionType>();
  const { isLoading, data, isRefetching } = useQuery(REACT_QUERY_CLIENT_KEYS.VOICEMAILS, APIGetVoicemail);

  useEffect(() => {
    if ((data && !responses) || responses !== data) {
      setResponses(data);
    }
  }, [data, responses]);

  const renderItem = ({ item }: any) => (
    <VoicemailItem response={getResponse(item.id)} onPress={() => setSelectedResponse(getResponse(item.id))} />
  );

  const getResponse = (id: string) => {
    if (!responses) return;
    return responses?.filter(r => r.id === id)[0];
  };

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <div className="list-content">
          <h3 className="list-title">impulse voicemail</h3>
          <Spinner color="white" visible={isLoading || isRefetching} />
          <EmptyList showStatus={responses?.length === 0} description="no responses found" />
          <FlatList
            data={responses}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </div>
      </SafeAreaView>
      {selectedResponse && <ModalMediaPreview response={selectedResponse} showModal={!!selectedResponse} deselectResponse={() => setSelectedResponse(undefined)} />}
    </>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 80,
    flexDirection: 'column',
    margin: 'auto',
    height: '90vh',
  },
});
