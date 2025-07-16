import { NativeModules } from 'react-native';
import {
  TikTokBusiness,
  initializeSdk,
  identify,
  logout,
  trackEvent,
  trackContentEvent,
  trackCustomEvent,
  TikTokEventName,
  TikTokContentEventName,
  TikTokContentEventParameter,
  TikTokContentEventContentsParameter,
} from '../index';

// Get the mocked module
const mockTikTokBusinessModule =
  NativeModules.TikTokBusinessModule as jest.Mocked<
    typeof NativeModules.TikTokBusinessModule
  >;

describe('TikTokBusiness', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initializeSdk', () => {
    it('should call native module with correct parameters', async () => {
      const appId = 'test-app-id';
      const ttAppId = 'test-tiktok-app-id';
      const debug = true;

      mockTikTokBusinessModule.initializeSdk.mockResolvedValue('success');

      await initializeSdk(appId, ttAppId, debug);

      expect(mockTikTokBusinessModule.initializeSdk).toHaveBeenCalledWith(
        appId,
        ttAppId,
        debug
      );
    });

    it('should default debug to false when not provided', async () => {
      const appId = 'test-app-id';
      const ttAppId = 'test-tiktok-app-id';

      mockTikTokBusinessModule.initializeSdk.mockResolvedValue('success');

      await initializeSdk(appId, ttAppId);

      expect(mockTikTokBusinessModule.initializeSdk).toHaveBeenCalledWith(
        appId,
        ttAppId,
        false
      );
    });

    it('should handle initialization errors', async () => {
      const appId = 'test-app-id';
      const ttAppId = 'test-tiktok-app-id';
      const error = new Error('Initialization failed');

      mockTikTokBusinessModule.initializeSdk.mockRejectedValue(error);

      await expect(initializeSdk(appId, ttAppId)).rejects.toThrow(
        'Initialization failed'
      );
    });
  });

  describe('identify', () => {
    it('should call native module with user information', async () => {
      const externalId = 'user123';
      const externalUserName = 'testuser';
      const phoneNumber = '+1234567890';
      const email = 'test@example.com';

      mockTikTokBusinessModule.identify.mockResolvedValue('success');

      await identify(externalId, externalUserName, phoneNumber, email);

      expect(mockTikTokBusinessModule.identify).toHaveBeenCalledWith(
        externalId,
        externalUserName,
        phoneNumber,
        email
      );
    });

    it('should handle identify errors', async () => {
      const error = new Error('Identify failed');
      mockTikTokBusinessModule.identify.mockRejectedValue(error);

      await expect(
        identify('user123', 'testuser', '+1234567890', 'test@example.com')
      ).rejects.toThrow('Identify failed');
    });
  });

  describe('logout', () => {
    it('should call native module logout', async () => {
      mockTikTokBusinessModule.logout.mockResolvedValue('success');

      await logout();

      expect(mockTikTokBusinessModule.logout).toHaveBeenCalled();
    });

    it('should handle logout errors', async () => {
      const error = new Error('Logout failed');
      mockTikTokBusinessModule.logout.mockRejectedValue(error);

      await expect(logout()).rejects.toThrow('Logout failed');
    });
  });

  describe('trackEvent', () => {
    it('should track standard event without properties', async () => {
      mockTikTokBusinessModule.trackEvent.mockResolvedValue('success');

      await trackEvent(TikTokEventName.REGISTRATION);

      expect(mockTikTokBusinessModule.trackEvent).toHaveBeenCalledWith(
        TikTokEventName.REGISTRATION,
        null,
        null
      );
    });

    it('should track standard event with event ID', async () => {
      const eventId = 'event123';
      mockTikTokBusinessModule.trackEvent.mockResolvedValue('success');

      await trackEvent(TikTokEventName.LOGIN, eventId);

      expect(mockTikTokBusinessModule.trackEvent).toHaveBeenCalledWith(
        TikTokEventName.LOGIN,
        eventId,
        null
      );
    });

    it('should track standard event with properties', async () => {
      const properties = {
        currency: 'USD',
        value: 100,
        description: 'Test event',
      };
      mockTikTokBusinessModule.trackEvent.mockResolvedValue('success');

      await trackEvent(TikTokEventName.SEARCH, undefined, properties);

      expect(mockTikTokBusinessModule.trackEvent).toHaveBeenCalledWith(
        TikTokEventName.SEARCH,
        null,
        properties
      );
    });

    it('should handle trackEvent errors', async () => {
      const error = new Error('Track event failed');
      mockTikTokBusinessModule.trackEvent.mockRejectedValue(error);

      await expect(trackEvent(TikTokEventName.REGISTRATION)).rejects.toThrow(
        'Track event failed'
      );
    });
  });

  describe('trackContentEvent', () => {
    it('should track content event without properties', async () => {
      mockTikTokBusinessModule.trackContentEvent.mockResolvedValue('success');

      await trackContentEvent(TikTokContentEventName.ADD_TO_CART);

      expect(mockTikTokBusinessModule.trackContentEvent).toHaveBeenCalledWith(
        TikTokContentEventName.ADD_TO_CART,
        undefined
      );
    });

    it('should track content event with complete properties', async () => {
      const properties = {
        [TikTokContentEventParameter.CURRENCY]: 'USD',
        [TikTokContentEventParameter.VALUE]: '4.99',
        [TikTokContentEventParameter.CONTENT_TYPE]: 'Purchase',
        [TikTokContentEventParameter.CONTENTS]: [
          {
            [TikTokContentEventContentsParameter.CONTENT_ID]: 'ABC',
            [TikTokContentEventContentsParameter.CONTENT_NAME]: 'Coffee',
            [TikTokContentEventContentsParameter.PRICE]: '4.99',
            [TikTokContentEventContentsParameter.QUANTITY]: 1,
          },
        ],
      };

      mockTikTokBusinessModule.trackContentEvent.mockResolvedValue('success');

      await trackContentEvent(TikTokContentEventName.CHECK_OUT, properties);

      expect(mockTikTokBusinessModule.trackContentEvent).toHaveBeenCalledWith(
        TikTokContentEventName.CHECK_OUT,
        properties
      );
    });

    it('should handle trackContentEvent errors', async () => {
      const error = new Error('Track content event failed');
      mockTikTokBusinessModule.trackContentEvent.mockRejectedValue(error);

      await expect(
        trackContentEvent(TikTokContentEventName.ADD_TO_CART)
      ).rejects.toThrow('Track content event failed');
    });
  });

  describe('trackCustomEvent', () => {
    it('should track custom event without properties', async () => {
      const eventName = 'custom_event';
      mockTikTokBusinessModule.trackCustomEvent.mockResolvedValue('success');

      await trackCustomEvent(eventName);

      expect(mockTikTokBusinessModule.trackCustomEvent).toHaveBeenCalledWith(
        eventName,
        undefined
      );
    });

    it('should track custom event with properties', async () => {
      const eventName = 'custom_event';
      const properties = {
        description: 'This is a custom event',
        value: 200,
        currency: 'USD',
      };
      mockTikTokBusinessModule.trackCustomEvent.mockResolvedValue('success');

      await trackCustomEvent(eventName, properties);

      expect(mockTikTokBusinessModule.trackCustomEvent).toHaveBeenCalledWith(
        eventName,
        properties
      );
    });

    it('should handle trackCustomEvent errors', async () => {
      const error = new Error('Track custom event failed');
      mockTikTokBusinessModule.trackCustomEvent.mockRejectedValue(error);

      await expect(trackCustomEvent('custom_event')).rejects.toThrow(
        'Track custom event failed'
      );
    });
  });

  describe('TikTokBusiness object', () => {
    it('should export all methods in TikTokBusiness object', () => {
      expect(TikTokBusiness).toHaveProperty('initializeSdk');
      expect(TikTokBusiness).toHaveProperty('identify');
      expect(TikTokBusiness).toHaveProperty('logout');
      expect(TikTokBusiness).toHaveProperty('trackEvent');
      expect(TikTokBusiness).toHaveProperty('trackContentEvent');
      expect(TikTokBusiness).toHaveProperty('trackCustomEvent');
    });

    it('should have methods that match standalone functions', () => {
      expect(TikTokBusiness.initializeSdk).toBe(initializeSdk);
      expect(TikTokBusiness.identify).toBe(identify);
      expect(TikTokBusiness.logout).toBe(logout);
      expect(TikTokBusiness.trackEvent).toBe(trackEvent);
      expect(TikTokBusiness.trackContentEvent).toBe(trackContentEvent);
      expect(TikTokBusiness.trackCustomEvent).toBe(trackCustomEvent);
    });
  });

  describe('Enums', () => {
    it('should export TikTokEventName enum with correct values', () => {
      expect(TikTokEventName.REGISTRATION).toBe('REGISTRATION');
      expect(TikTokEventName.LOGIN).toBe('LOGIN');
      expect(TikTokEventName.SEARCH).toBe('SEARCH');
      expect(TikTokEventName.ADD_PAYMENT_INFO).toBe('ADD_PAYMENT_INFO');
    });

    it('should export TikTokContentEventName enum with correct values', () => {
      expect(TikTokContentEventName.ADD_TO_CART).toBe('ADD_TO_CART');
      expect(TikTokContentEventName.CHECK_OUT).toBe('CHECK_OUT');
      expect(TikTokContentEventName.PURCHASE).toBe('PURCHASE');
      expect(TikTokContentEventName.VIEW_CONTENT).toBe('VIEW_CONTENT');
    });

    it('should export TikTokContentEventParameter enum with correct values', () => {
      expect(TikTokContentEventParameter.CURRENCY).toBe('CURRENCY');
      expect(TikTokContentEventParameter.VALUE).toBe('VALUE');
      expect(TikTokContentEventParameter.CONTENT_TYPE).toBe('CONTENT_TYPE');
      expect(TikTokContentEventParameter.CONTENTS).toBe('CONTENTS');
    });

    it('should export TikTokContentEventContentsParameter enum with correct values', () => {
      expect(TikTokContentEventContentsParameter.CONTENT_ID).toBe('CONTENT_ID');
      expect(TikTokContentEventContentsParameter.CONTENT_NAME).toBe(
        'CONTENT_NAME'
      );
      expect(TikTokContentEventContentsParameter.PRICE).toBe('PRICE');
      expect(TikTokContentEventContentsParameter.QUANTITY).toBe('QUANTITY');
    });
  });
});
