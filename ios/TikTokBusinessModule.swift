import Foundation
import React
import UIKit
import TikTokBusinessSdk

@objc(TikTokBusinessModule)
class TikTokBusinessModule: NSObject, RCTBridgeModule {
  
  // MARK: - RCTBridgeModule Protocol
  
  static func moduleName() -> String! {
    return "TikTokBusinessModule"
  }
  
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  // MARK: - Public Methods Exposed to JS
  
  /// Identifies the user (login, signup, profile update, etc.).
  @objc func identify(_ externalId: String,
                      externalUserName: String?,
                      phoneNumber: String?,
                      email: String) {
    TikTokBusinessSdk.identify(withExternalID: externalId,
                               externalUserName: externalUserName,
                               phoneNumber: phoneNumber,
                               email: email)
  }
  
  /// Logs out the user.
  @objc func logout() {
    TikTokBusinessSdk.logout()
  }
  
  /// Reports a standard event.
  /// If `parameters` is nil or empty, the event is reported without additional properties.
  /// Otherwise, a TTBaseEvent is built with the provided properties.
  /// Expects the eventName to match one of the values in the EventName enum.
  @objc func trackEvent(_ eventName: String,
                        eventId: String?,
                        parameters: NSDictionary?) {
    guard let eventEnum = EventName(rawValue: eventName) else {
      print("Invalid event name: \(eventName)")
      return
    }
    
    if parameters == nil || (parameters?.count ?? 0) == 0 {
      if eventId == nil || eventId!.isEmpty {
        TikTokBusinessSdk.trackTTEvent(eventEnum)
      } else {
        TikTokBusinessSdk.trackTTEvent(eventEnum, eventId: eventId!)
      }
    } else {
      let builder = TTBaseEvent.newBuilder(eventName: eventEnum.toString())
      for (key, value) in parameters! {
        guard let keyStr = key as? String else { continue }
        if let stringValue = value as? String {
          builder.addProperty(key: keyStr, value: stringValue)
        } else if let numberValue = value as? NSNumber {
          builder.addProperty(key: keyStr, value: numberValue.doubleValue)
        } else if let boolValue = value as? Bool {
          builder.addProperty(key: keyStr, value: boolValue)
        }
      }
      let event = builder.build()
      TikTokBusinessSdk.trackTTEvent(event)
    }
  }
  
  /// Reports a content event.
  /// Selects the appropriate event builder based on the eventType and iterates over the "CONTENTS" array to add all content items.
  @objc func trackContentEvent(_ eventType: String,
                               properties: NSDictionary?) {
    var builder: TTContentsEventBuilder
    switch eventType {
    case "ADD_TO_CART":
      builder = TTAddToCartEvent.newBuilder()
    case "ADD_TO_WHISHLIST":
      builder = TTAddToWishlistEvent.newBuilder()
    case "CHECK_OUT":
      builder = TTCheckoutEvent.newBuilder()
    case "PURCHASE":
      builder = TTPurchaseEvent.newBuilder()
    case "VIEW_CONTENT":
      builder = TTViewContentEvent.newBuilder()
    default:
      print("Unsupported content event type: \(eventType)")
      return
    }
    
    if let props = properties, props.count > 0 {
      if let description = props["DESCRIPTION"] as? String {
        builder.setDescription(description)
      }
      if let currencyStr = props["CURRENCY"] as? String, !currencyStr.isEmpty,
         let currency = TTContentsEventConstants.Currency(rawValue: currencyStr) {
        builder.setCurrency(currency)
      }
      if let value = props["VALUE"] as? NSNumber {
        builder.setValue(value.doubleValue)
      }
      if let contentType = props["CONTENT_TYPE"] as? String {
        builder.setContentType(contentType)
      }
      
      // Process the "CONTENTS" array
      if let contentsArray = props["CONTENTS"] as? [NSDictionary] {
        var contentParamsList: [TTContentParams] = []
        for contentDict in contentsArray {
          let contentBuilder = TTContentParams.newBuilder()
          if let contentId = contentDict["CONTENT_ID"] as? String {
            contentBuilder.setContentId(contentId)
          }
          if let contentCategory = contentDict["CONTENT_CATEGORY"] as? String {
            contentBuilder.setContentCategory(contentCategory)
          }
          if let brand = contentDict["BRAND"] as? String {
            contentBuilder.setBrand(brand)
          }
          if let price = contentDict["PRICE"] as? NSNumber {
            contentBuilder.setPrice(Float(price.doubleValue))
          }
          if let quantity = contentDict["QUANTITY"] as? NSNumber {
            contentBuilder.setQuantity(quantity.intValue)
          }
          if let contentName = contentDict["CONTENT_NAME"] as? String {
            contentBuilder.setContentName(contentName)
          }
          contentParamsList.append(contentBuilder.build())
        }
        // Set all content items using the varargs setter
        builder.setContents(contents: contentParamsList)
      }
    }
    let event = builder.build()
    TikTokBusinessSdk.trackTTEvent(event)
  }
  
  /// Reports a custom event.
  /// Builds the event using TTBaseEvent.newBuilder and adds the provided properties.
  @objc func trackCustomEvent(_ eventName: String,
                              properties: NSDictionary?) {
    let builder = TTBaseEvent.newBuilder(eventName: eventName)
    if let props = properties, props.count > 0 {
      for (key, value) in props {
        guard let keyStr = key as? String else { continue }
        if let stringValue = value as? String {
          builder.addProperty(key: keyStr, value: stringValue)
        } else if let numberValue = value as? NSNumber {
          builder.addProperty(key: keyStr, value: numberValue.doubleValue)
        } else if let boolValue = value as? Bool {
          builder.addProperty(key: keyStr, value: boolValue)
        }
      }
    }
    let event = builder.build()
    TikTokBusinessSdk.trackTTEvent(event)
  }
  
  /// Initializes the TikTok SDK.
  /// Accepts appId, ttAppId, and an optional debug flag.
  @objc func initializeSdk(_ appId: String,
                           _ ttAppId: String,
                           _ debug: Bool?) {
    // let context = UIApplication.shared
    // let config = TikTokBusinessSdk.TTConfig(context: context)
    //   .setAppId(appId)
    //   .setTTAppId(ttAppId)
    let config = TikTokConfig.init(appId: appId, tiktokAppId: ttAppId)
    if let debugValue = debug {
      config.openDebugMode().setLogLevel(TikTokBusinessSdk.LogLevel.DEBUG)
    }
    TikTokBusinessSdk.initializeSdk(config) { (success: Bool, code: Int, msg: String?) in
      if success {
        TikTokBusinessSdk.startTrack()
      } else {
        print("Initialization failed: \(msg ?? "Unknown error") (code: \(code))")
      }
    }
  }
}