"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trackEvent = exports.trackCustomEvent = exports.trackContentEvent = exports.trackAdRevenueEvent = exports.logout = exports.initializeSdk = exports.identify = exports.flush = exports.default = exports.TikTokEventName = exports.TikTokContentEventParameter = exports.TikTokContentEventName = exports.TikTokContentEventContentsParameter = exports.TikTokBusiness = void 0;
var _reactNative = require("react-native");
const LINKING_ERROR = `The package 'react-native-tiktok-business' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const TikTokBusinessModule = _reactNative.NativeModules.TikTokBusinessModule ? _reactNative.NativeModules.TikTokBusinessModule : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});

/**
 * TikTok event names as defined by the TikTok Business SDK.
 */
let TikTokEventName = exports.TikTokEventName = /*#__PURE__*/function (TikTokEventName) {
  TikTokEventName["ACHIEVE_LEVEL"] = "AchieveLevel";
  TikTokEventName["ADD_PAYMENT_INFO"] = "AddPaymentInfo";
  TikTokEventName["COMPLETE_TUTORIAL"] = "CompleteTutorial";
  TikTokEventName["CREATE_GROUP"] = "CreateGroup";
  TikTokEventName["CREATE_ROLE"] = "CreateRole";
  TikTokEventName["GENERATE_LEAD"] = "GenerateLead";
  TikTokEventName["IMPRESSION_LEVEL_AD_REVENUE"] = "ImpressionLevelAdRevenue";
  TikTokEventName["IN_APP_AD_CLICK"] = "InAppADClick";
  TikTokEventName["IN_APP_AD_IMPR"] = "InAppADImpr";
  TikTokEventName["INSTALL_APP"] = "InstallApp";
  TikTokEventName["JOIN_GROUP"] = "JoinGroup";
  TikTokEventName["LAUNCH_APP"] = "LaunchAPP";
  TikTokEventName["LOAN_APPLICATION"] = "LoanApplication";
  TikTokEventName["LOAN_APPROVAL"] = "LoanApproval";
  TikTokEventName["LOAN_DISBURSAL"] = "LoanDisbursal";
  TikTokEventName["LOGIN"] = "Login";
  TikTokEventName["RATE"] = "Rate";
  TikTokEventName["REGISTRATION"] = "Registration";
  TikTokEventName["SEARCH"] = "Search";
  TikTokEventName["SPEND_CREDITS"] = "SpendCredits";
  TikTokEventName["START_TRIAL"] = "StartTrial";
  TikTokEventName["SUBSCRIBE"] = "Subscribe";
  TikTokEventName["UNLOCK_ACHIEVEMENT"] = "UnlockAchievement";
  return TikTokEventName;
}({}); // Events that allow additional parameters:
let TikTokContentEventName = exports.TikTokContentEventName = /*#__PURE__*/function (TikTokContentEventName) {
  TikTokContentEventName["ADD_TO_CART"] = "ADD_TO_CART";
  TikTokContentEventName["ADD_TO_WISHLIST"] = "ADD_TO_WISHLIST";
  TikTokContentEventName["CHECK_OUT"] = "CHECK_OUT";
  TikTokContentEventName["PURCHASE"] = "PURCHASE";
  TikTokContentEventName["VIEW_CONTENT"] = "VIEW_CONTENT";
  return TikTokContentEventName;
}({});
/**
 * Standard event parameters.
 */
let TikTokContentEventParameter = exports.TikTokContentEventParameter = /*#__PURE__*/function (TikTokContentEventParameter) {
  TikTokContentEventParameter["CONTENT_TYPE"] = "CONTENT_TYPE";
  TikTokContentEventParameter["CONTENT_ID"] = "CONTENT_ID";
  TikTokContentEventParameter["DESCRIPTION"] = "DESCRIPTION";
  TikTokContentEventParameter["CURRENCY"] = "CURRENCY";
  TikTokContentEventParameter["VALUE"] = "VALUE";
  TikTokContentEventParameter["CONTENTS"] = "CONTENTS";
  TikTokContentEventParameter["ORDER_ID"] = "ORDER_ID";
  return TikTokContentEventParameter;
}({});
/**
 * Content parameters for events with detailed content information.
 */
let TikTokContentEventContentsParameter = exports.TikTokContentEventContentsParameter = /*#__PURE__*/function (TikTokContentEventContentsParameter) {
  TikTokContentEventContentsParameter["CONTENT_ID"] = "CONTENT_ID";
  // Unique product or content ID.
  TikTokContentEventContentsParameter["CONTENT_CATEGORY"] = "CONTENT_CATEGORY";
  // Product or page category.
  TikTokContentEventContentsParameter["BRAND"] = "BRAND";
  // Brand name.
  TikTokContentEventContentsParameter["PRICE"] = "PRICE";
  // Price of the item.
  TikTokContentEventContentsParameter["QUANTITY"] = "QUANTITY";
  // Number of items.
  TikTokContentEventContentsParameter["CONTENT_NAME"] = "CONTENT_NAME"; // Name of the product or page.
  return TikTokContentEventContentsParameter;
}({});
/**
 * Initializes the TikTok SDK.
 * @param appId - Your app ID (e.g., Android package name or iOS listing ID)
 * @param ttAppId - Your TikTok App ID from TikTok Events Manager
 * @param accessToken - Your access token from TikTok Events Manager
 * @param debug - Whether to enable debug mode
 * @returns A promise that resolves when the SDK is initialized.
 */
const initializeSdk = async (appId, ttAppId, accessToken, debug) => await TikTokBusinessModule.initializeSdk(appId, ttAppId, accessToken, debug || false);

/**
 * Identifies the user.
 */
exports.initializeSdk = initializeSdk;
const identify = async (externalId, externalUserName, phoneNumber, email) => await TikTokBusinessModule.identify(externalId, externalUserName, phoneNumber, email);

/**
 * Logs out the user.
 */
exports.identify = identify;
const logout = async () => await TikTokBusinessModule.logout();

/**
 * Reports a standard event.
 * Accepts an optional eventId and additional properties.
 */
exports.logout = logout;
const trackEvent = async (eventName, eventId, properties) => await TikTokBusinessModule.trackEvent(eventName, eventId || null, properties || null);

/**
 * Reports a content event.
 * Accepts the event type (e.g., "ADD_TO_CART", "CHECK_OUT") and additional properties.
 */
exports.trackEvent = trackEvent;
const trackContentEvent = async (eventName, properties) => await TikTokBusinessModule.trackContentEvent(eventName, properties);

/**
 * Reports a custom event.
 * Builds the event using TTBaseEvent and adds provided properties.
 */
exports.trackContentEvent = trackContentEvent;
const trackCustomEvent = async (eventName, properties) => await TikTokBusinessModule.trackCustomEvent(eventName, properties);

/**
 * Ad revenue data structure for impression-level ad revenue tracking
 */
exports.trackCustomEvent = trackCustomEvent;
/**
 * Reports an ad revenue event for impression-level ad revenue tracking.
 * @param adRevenueData - Ad revenue data containing revenue, currency, network info, etc.
 * @param eventId - Optional event ID for tracking
 */
const trackAdRevenueEvent = async (adRevenueData, eventId) => await TikTokBusinessModule.trackAdRevenueEvent(adRevenueData, eventId || null);
exports.trackAdRevenueEvent = trackAdRevenueEvent;
const flush = () => TikTokBusinessModule.flush();
exports.flush = flush;
const TikTokBusiness = exports.TikTokBusiness = {
  initializeSdk,
  identify,
  logout,
  trackEvent,
  trackContentEvent,
  trackCustomEvent,
  trackAdRevenueEvent,
  flush
};
var _default = exports.default = TikTokBusiness;
//# sourceMappingURL=index.js.map