import {Action, action} from 'easy-peasy';

export type ResetFunction = { id: string, reset?: () => void };

export declare interface IResetModel {
  resetFunctions: ResetFunction[];
  addResetFunction: Action<IResetModel, ResetFunction>;
  removeResetFunctionById: Action<IResetModel, string>;
}

const model: IResetModel = {
  resetFunctions: [],
  addResetFunction: action((state, payload) => {
    state.resetFunctions.push(payload);
  }),
  removeResetFunctionById: action((state, payload) => {
    const index = state.resetFunctions.findIndex(f => f.id === payload);
    if (index !== -1) {
      state.resetFunctions.splice(index, 1);
    }
  }),
};

export default model;
