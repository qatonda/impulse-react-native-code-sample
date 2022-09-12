//
//  RNUserIdentity.m
//  ReactiveImpulse
//
//  Created by Antonio Alves on 2/2/22.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RNUserIdentity, NSObject)
RCT_EXTERN_METHOD(getUserIdentity:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
@end
