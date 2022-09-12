//
//  PushNotificationManager.m
//  ReactiveImpulse
//
//  Created by Antonio Alves on 10/19/21.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(PushNotificationManager, NSObject)

RCT_EXTERN_METHOD(notificationAuthorization:(NSDictionary *)options)

@end
