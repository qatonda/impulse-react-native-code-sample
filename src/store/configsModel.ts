import {Action, action} from 'easy-peasy';

const showUnpluggedKey = 'show_unplug_ui_on_inactive_prize';

export declare interface IConfigsStoreModel {
  configs: any;
  unplugged: boolean;
  setConfigs: Action<IConfigsStoreModel, any>;
}

const model: IConfigsStoreModel = {
  configs: undefined,
  unplugged: false,
  setConfigs: action((state, payload) => {
    state.configs = payload;
    state.unplugged = payload[showUnpluggedKey] ?? false;
  }),
};

export default model;
