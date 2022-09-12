//
//  LocationService.m
//  ReactiveImpulse
//
//  Created by Antonio Alves on 10/25/21.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(LocationService, NSObject)

RCT_EXTERN_METHOD(requestLocationAuthorization:(NSDictionary *)options callback:(RCTResponseSenderBlock)callback)
@end
