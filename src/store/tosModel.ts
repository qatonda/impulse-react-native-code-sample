import {Action, action} from 'easy-peasy';

export declare interface ITOSStoreModel {
  accepted: boolean;
  setAccepted: Action<ITOSStoreModel, boolean>;
}

const model: ITOSStoreModel = {
  accepted: false,
  setAccepted: action((state, payload) => {
    state.accepted = payload;
  }),
};

export default model;
