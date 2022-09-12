import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { APIGetConfigs } from '../services/api';
import { useStoreActions, useStoreState } from '../store/hooks';

export const useConfigs = () => {
  const configs = useStoreState((state) => state.configs.configs);
  const unplugged = useStoreState((state) => state.configs.unplugged);
  const setConfigs = useStoreActions((actions) => actions.configs.setConfigs);

  const { data } = useQuery('get-configs', APIGetConfigs);

  useEffect(() => {
    if (data && !configs) {
      setConfigs(data);
    }
  }, [configs, data, setConfigs]);

  return { configs, unplugged };
};
