import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-tiktok-business' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const TikTokBusinessModule = NativeModules.TikTokBusinessModule
  ? NativeModules.TikTokBusinessModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

/**
 * TikTok event names as defined by the TikTok Business SDK.
 */
export enum TikTokEventName {
  ACHIEVE_LEVEL = 'AchieveLevel',
  ADD_PAYMENT_INFO = 'AddPaymentInfo',
  COMPLETE_TUTORIAL = 'CompleteTutorial',
  CREATE_GROUP = 'CreateGroup',
  CREATE_ROLE = 'CreateRole',
  GENERATE_LEAD = 'GenerateLead',
  IMPRESSION_LEVEL_AD_REVENUE = 'ImpressionLevelAdRevenue',
  IN_APP_AD_CLICK = 'InAppADClick',
  IN_APP_AD_IMPR = 'InAppADImpr',
  INSTALL_APP = 'InstallApp',
  JOIN_GROUP = 'JoinGroup',
  LAUNCH_APP = 'LaunchAPP',
  LOAN_APPLICATION = 'LoanApplication',
  LOAN_APPROVAL = 'LoanApproval',
  LOAN_DISBURSAL = 'LoanDisbursal',
  LOGIN = 'Login',
  RATE = 'Rate',
  REGISTRATION = 'Registration',
  SEARCH = 'Search',
  SPEND_CREDITS = 'SpendCredits',
  START_TRIAL = 'StartTrial',
  SUBSCRIBE = 'Subscribe',
  UNLOCK_ACHIEVEMENT = 'UnlockAchievement',
}

// Events that allow additional parameters:
export enum TikTokContentEventName {
  ADD_TO_CART = 'ADD_TO_CART',
  ADD_TO_WISHLIST = 'ADD_TO_WISHLIST',
  CHECK_OUT = 'CHECK_OUT',
  PURCHASE = 'PURCHASE',
  VIEW_CONTENT = 'VIEW_CONTENT',
}

/**
 * Standard event parameters.
 */
export enum TikTokContentEventParameter {
  CONTENT_TYPE = 'CONTENT_TYPE',
  CONTENT_ID = 'CONTENT_ID',
  DESCRIPTION = 'DESCRIPTION',
  CURRENCY = 'CURRENCY',
  VALUE = 'VALUE',
  CONTENTS = 'CONTENTS',
  ORDER_ID = 'ORDER_ID',
}

/**
 * Content parameters for events with detailed content information.
 */
export enum TikTokContentEventContentsParameter {
  CONTENT_ID = 'CONTENT_ID', // Unique product or content ID.
  CONTENT_CATEGORY = 'CONTENT_CATEGORY', // Product or page category.
  BRAND = 'BRAND', // Brand name.
  PRICE = 'PRICE', // Price of the item.
  QUANTITY = 'QUANTITY', // Number of items.
  CONTENT_NAME = 'CONTENT_NAME', // Name of the product or page.
}

type EventProps = {
  contents?: {
    price: number;
    quantity: number;
    content_type: string;
    content_id: string;
    brand: string;
    content_name: string;
  };
  currency: string;
  value: number;
  description: string;
  query: string;
};

/**
 * Initializes the TikTok SDK.
 * @param appId - Your app ID (e.g., Android package name or iOS listing ID)
 * @param ttAppId - Your TikTok App ID from TikTok Events Manager
 * @param accessToken - Your access token from TikTok Events Manager
 * @param debug - Whether to enable debug mode
 * @returns A promise that resolves when the SDK is initialized.
 */
export const initializeSdk = async (
  appId: string,
  ttAppId: string,
  accessToken: string,
  debug?: Boolean
): Promise<string> =>
  await TikTokBusinessModule.initializeSdk(
    appId,
    ttAppId,
    accessToken,
    debug || false
  );

/**
 * Identifies the user.
 */
export const identify = async (
  externalId: string,
  externalUserName: string,
  phoneNumber: string,
  email: string
): Promise<string> =>
  await TikTokBusinessModule.identify(
    externalId,
    externalUserName,
    phoneNumber,
    email
  );

/**
 * Logs out the user.
 */
export const logout = async (): Promise<string> =>
  await TikTokBusinessModule.logout();

/**
 * Reports a standard event.
 * Accepts an optional eventId and additional properties.
 */
export const trackEvent = async (
  eventName: TikTokEventName,
  eventId?: string,
  properties?: Partial<EventProps>
): Promise<string> =>
  await TikTokBusinessModule.trackEvent(
    eventName,
    eventId || null,
    properties || null
  );

/**
 * Reports a content event.
 * Accepts the event type (e.g., "ADD_TO_CART", "CHECK_OUT") and additional properties.
 */
export const trackContentEvent = async (
  eventName: TikTokContentEventName,
  properties?: Partial<
    Record<
      TikTokContentEventParameter,
      | string
      | number
      | boolean
      | Array<
          Partial<
            Record<
              TikTokContentEventContentsParameter,
              string | number | boolean
            >
          >
        >
    >
  >
): Promise<string> =>
  await TikTokBusinessModule.trackContentEvent(eventName, properties);

/**
 * Reports a custom event.
 * Builds the event using TTBaseEvent and adds provided properties.
 */
export const trackCustomEvent = async (
  eventName: string,
  properties?: Partial<EventProps>
): Promise<string> =>
  await TikTokBusinessModule.trackCustomEvent(eventName, properties);

/**
 * Ad revenue data structure for impression-level ad revenue tracking
 */
export interface AdRevenueData {
  /** Revenue amount in the specified currency */
  revenue?: number;
  /** Currency code (e.g., 'USD', 'EUR') */
  currency?: string;
  /** Ad network name (e.g., 'AdMob', 'Unity', 'IronSource') */
  adNetwork?: string;
  /** Ad unit identifier */
  adUnit?: string;
  /** Ad format (e.g., 'banner', 'interstitial', 'rewarded') */
  adFormat?: string;
  /** Placement identifier */
  placement?: string;
  /** Country code where ad was shown */
  country?: string;
  /** Precision level of the revenue data */
  precision?: string;
  /** Additional custom properties */
  [key: string]: string | number | boolean | undefined;
}

/**
 * Reports an ad revenue event for impression-level ad revenue tracking.
 * @param adRevenueData - Ad revenue data containing revenue, currency, network info, etc.
 * @param eventId - Optional event ID for tracking
 */
export const trackAdRevenueEvent = async (
  adRevenueData: AdRevenueData,
  eventId?: string
): Promise<string> =>
  await TikTokBusinessModule.trackAdRevenueEvent(
    adRevenueData,
    eventId || null
  );

export const flush = (): void => TikTokBusinessModule.flush();

export const TikTokBusiness = {
  initializeSdk,
  identify,
  logout,
  trackEvent,
  trackContentEvent,
  trackCustomEvent,
  trackAdRevenueEvent,
  flush,
};

export default TikTokBusiness;
