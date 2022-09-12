import AuthModel, {IAuthStoreModel} from './authModel';
import ConfigModel, { IConfigsStoreModel } from './configsModel';
import OnboardingModel, { IOnboardingStoreModel } from './onboardingModel';
import ResetModel, { IResetModel } from './resetModel';
import TOSModel, { ITOSStoreModel } from './tosModel';

export interface IGlobalStoreModel {
  auth: IAuthStoreModel;
  termsOfService: ITOSStoreModel;
  configs: IConfigsStoreModel;
  onboarding: IOnboardingStoreModel
  reset: IResetModel;
}

export const GlobalStoreModel = {
  auth: AuthModel,
  termsOfService: TOSModel,
  configs: ConfigModel,
  onboarding: OnboardingModel,
  reset: ResetModel,
};
