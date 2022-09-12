import {createStore, persist} from 'easy-peasy';
import {IGlobalStoreModel, GlobalStoreModel} from './model';
import * as hooks from './hooks';
import storage from './storage';

export default createStore<IGlobalStoreModel>(
  persist(GlobalStoreModel, { storage }),
);

export const Hooks = hooks;
