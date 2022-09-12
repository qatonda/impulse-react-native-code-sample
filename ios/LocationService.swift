//
//  LocationService.swift
//  ReactiveImpulse
//
//  Created by Antonio Alves on 10/25/21.
//

import Foundation
import CoreLocation

@objc(LocationService)
class LocationService: NSObject, CLLocationManagerDelegate {
  
  private var locationManager: CLLocationManager = CLLocationManager()
  private var requestLocationAuthorizationCallback: ((CLAuthorizationStatus) -> Void)?
  
  @objc static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  @objc func requestLocationAuthorization(_ options: NSDictionary, callback: @escaping RCTResponseSenderBlock) -> Void {
    DispatchQueue.main.async {
      self._requestLocationAuthorization(options: options, callback: callback)
    }
  }
  
  private func _requestLocationAuthorization(options: NSDictionary, callback: @escaping RCTResponseSenderBlock) -> Void {
    
    self.locationManager.delegate = self
    let currentStatus = CLLocationManager.authorizationStatus()
    
    // Only ask authorization if it was never asked before
    guard currentStatus == .notDetermined else { return }
    
    // Starting on iOS 13.4.0, to get .authorizedAlways permission, you need to
    // first ask for WhenInUse permission, then ask for Always permission to
    // get to a second system alert
    if #available(iOS 13.4, *) {
      self.requestLocationAuthorizationCallback = { status in
        callback([NSNull(), status])
        if status == .authorizedWhenInUse {
          self.locationManager.requestAlwaysAuthorization()
        }
      }
      self.locationManager.requestWhenInUseAuthorization()
    } else {
      self.locationManager.requestAlwaysAuthorization()
    }
  }
  // MARK: - CLLocationManagerDelegate
  public func locationManager(_ manager: CLLocationManager,
                              didChangeAuthorization status: CLAuthorizationStatus) {
    self.requestLocationAuthorizationCallback?(status)
  }
}
