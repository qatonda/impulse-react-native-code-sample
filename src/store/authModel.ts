import {Action, action} from 'easy-peasy';

export declare interface IAuthStoreModel {
  token?: string;
  setToken: Action<IAuthStoreModel, string | undefined>;
}

const model: IAuthStoreModel = {
  token: undefined,
  setToken: action((state, payload) => {
    state.token = payload;
  }),
};

export default model;
