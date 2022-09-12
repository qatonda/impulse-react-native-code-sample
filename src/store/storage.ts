import { PersistStorage } from 'easy-peasy';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storage: PersistStorage  = {
  getItem: async key => {
    const item = await AsyncStorage.getItem(key);
    if (item) {
      const json = await JSON.parse(item);
      console.log('json', json);
      return json;
    } else {
      return undefined;
    }
  },
  setItem: async (key, value) => {
    console.log('setting key', key, 'value', value);
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: async key => {
    await AsyncStorage.removeItem(key);
  },
};


export default storage;
