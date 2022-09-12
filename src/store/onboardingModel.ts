import {Action, action} from 'easy-peasy';

export declare interface IOnboardingStoreModel {
  viewed: boolean;
  setViewed: Action<IOnboardingStoreModel, boolean>;
}

const model: IOnboardingStoreModel = {
  viewed: false,
  setViewed: action((state, payload) => {
    state.viewed = payload;
  }),
};

export default model;
