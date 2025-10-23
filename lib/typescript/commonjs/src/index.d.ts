/**
 * TikTok event names as defined by the TikTok Business SDK.
 */
export declare enum TikTokEventName {
    ACHIEVE_LEVEL = "AchieveLevel",
    ADD_PAYMENT_INFO = "AddPaymentInfo",
    COMPLETE_TUTORIAL = "CompleteTutorial",
    CREATE_GROUP = "CreateGroup",
    CREATE_ROLE = "CreateRole",
    GENERATE_LEAD = "GenerateLead",
    IMPRESSION_LEVEL_AD_REVENUE = "ImpressionLevelAdRevenue",
    IN_APP_AD_CLICK = "InAppADClick",
    IN_APP_AD_IMPR = "InAppADImpr",
    INSTALL_APP = "InstallApp",
    JOIN_GROUP = "JoinGroup",
    LAUNCH_APP = "LaunchAPP",
    LOAN_APPLICATION = "LoanApplication",
    LOAN_APPROVAL = "LoanApproval",
    LOAN_DISBURSAL = "LoanDisbursal",
    LOGIN = "Login",
    RATE = "Rate",
    REGISTRATION = "Registration",
    SEARCH = "Search",
    SPEND_CREDITS = "SpendCredits",
    START_TRIAL = "StartTrial",
    SUBSCRIBE = "Subscribe",
    UNLOCK_ACHIEVEMENT = "UnlockAchievement"
}
export declare enum TikTokContentEventName {
    ADD_TO_CART = "ADD_TO_CART",
    ADD_TO_WISHLIST = "ADD_TO_WISHLIST",
    CHECK_OUT = "CHECK_OUT",
    PURCHASE = "PURCHASE",
    VIEW_CONTENT = "VIEW_CONTENT"
}
/**
 * Standard event parameters.
 */
export declare enum TikTokContentEventParameter {
    CONTENT_TYPE = "CONTENT_TYPE",
    CONTENT_ID = "CONTENT_ID",
    DESCRIPTION = "DESCRIPTION",
    CURRENCY = "CURRENCY",
    VALUE = "VALUE",
    CONTENTS = "CONTENTS",
    ORDER_ID = "ORDER_ID"
}
/**
 * Content parameters for events with detailed content information.
 */
export declare enum TikTokContentEventContentsParameter {
    CONTENT_ID = "CONTENT_ID",// Unique product or content ID.
    CONTENT_CATEGORY = "CONTENT_CATEGORY",// Product or page category.
    BRAND = "BRAND",// Brand name.
    PRICE = "PRICE",// Price of the item.
    QUANTITY = "QUANTITY",// Number of items.
    CONTENT_NAME = "CONTENT_NAME"
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
export declare const initializeSdk: (appId: string, ttAppId: string, accessToken: string, debug?: Boolean) => Promise<string>;
/**
 * Identifies the user.
 */
export declare const identify: (externalId: string, externalUserName: string, phoneNumber: string, email: string) => Promise<string>;
/**
 * Logs out the user.
 */
export declare const logout: () => Promise<string>;
/**
 * Reports a standard event.
 * Accepts an optional eventId and additional properties.
 */
export declare const trackEvent: (eventName: TikTokEventName, eventId?: string, properties?: Partial<EventProps>) => Promise<string>;
/**
 * Reports a content event.
 * Accepts the event type (e.g., "ADD_TO_CART", "CHECK_OUT") and additional properties.
 */
export declare const trackContentEvent: (eventName: TikTokContentEventName, properties?: Partial<Record<TikTokContentEventParameter, string | number | boolean | Array<Partial<Record<TikTokContentEventContentsParameter, string | number | boolean>>>>>) => Promise<string>;
/**
 * Reports a custom event.
 * Builds the event using TTBaseEvent and adds provided properties.
 */
export declare const trackCustomEvent: (eventName: string, properties?: Partial<EventProps>) => Promise<string>;
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
export declare const trackAdRevenueEvent: (adRevenueData: AdRevenueData, eventId?: string) => Promise<string>;
export declare const flush: () => void;
export declare const TikTokBusiness: {
    initializeSdk: (appId: string, ttAppId: string, accessToken: string, debug?: Boolean) => Promise<string>;
    identify: (externalId: string, externalUserName: string, phoneNumber: string, email: string) => Promise<string>;
    logout: () => Promise<string>;
    trackEvent: (eventName: TikTokEventName, eventId?: string, properties?: Partial<EventProps>) => Promise<string>;
    trackContentEvent: (eventName: TikTokContentEventName, properties?: Partial<Record<TikTokContentEventParameter, string | number | boolean | Array<Partial<Record<TikTokContentEventContentsParameter, string | number | boolean>>>>>) => Promise<string>;
    trackCustomEvent: (eventName: string, properties?: Partial<EventProps>) => Promise<string>;
    trackAdRevenueEvent: (adRevenueData: AdRevenueData, eventId?: string) => Promise<string>;
    flush: () => void;
};
export default TikTokBusiness;
//# sourceMappingURL=index.d.ts.map