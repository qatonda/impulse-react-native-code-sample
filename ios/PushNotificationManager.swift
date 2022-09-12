//
//  PushNotificationManager.swift
//  ReactiveImpulse
//
//  Created by Antonio Alves on 10/19/21.
//

import Foundation
import UserNotifications

@objc(PushNotificationManager)
class PushNotificationManager: NSObject {

  @objc static func requiresMainQueueSetup() -> Bool {
      return false
  }

  @objc func notificationAuthorization(_ options: NSDictionary) -> Void {
    DispatchQueue.main.async {
      self._notificationAuthorization(options: options)
    }
  }
  
  func _notificationAuthorization(options: NSDictionary) -> Void {
    let center = UNUserNotificationCenter.current()
    center.delegate = self
    center.requestAuthorization(options: [.sound,.alert,.badge]) { (granted, error) in
        if granted {
            print("Notification Enable Successfully")
        }else{
            print("Some Error Occure")
        }
    }
  }
}

extension PushNotificationManager: UNUserNotificationCenterDelegate {
  @available(iOS 10.0, *)
  func userNotificationCenter(_ center: UNUserNotificationCenter, willPresent notification: UNNotification, withCompletionHandler completionHandler: @escaping (_ options:UNNotificationPresentationOptions) -> Void)
  {
    print("Handle push from foreground")
        // custom code to handle push while app is in the foreground
    print("\(notification.request.content.userInfo)")
  }
    //Second for background and close
  @available(iOS 10.0, *)
  func userNotificationCenter(_ center: UNUserNotificationCenter, didReceive response:UNNotificationResponse, withCompletionHandler completionHandler: @escaping () -> Void)
  {
    print("Handle push from background or closed")
        // if you set a member variable in didReceiveRemoteNotification, you will know if this is from closed or background
    print("\(response.notification.request.content.userInfo)")
  }
}
