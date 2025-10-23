declare const mockTikTokBusinessModule: {
    initializeSdk: jest.Mock<any, any, any>;
    identify: jest.Mock<any, any, any>;
    logout: jest.Mock<any, any, any>;
    trackEvent: jest.Mock<any, any, any>;
    trackContentEvent: jest.Mock<any, any, any>;
    trackCustomEvent: jest.Mock<any, any, any>;
    trackAdRevenueEvent: jest.Mock<any, any, any>;
};
declare global {
    namespace jest {
        interface Matchers<R> {
            toHaveBeenCalledWithEventName(eventName: string): R;
            toHaveBeenCalledWithProperties(properties: any): R;
        }
    }
}
export declare const createMockResponse: (success?: boolean, data?: any) => Promise<any>;
export declare const resetAllMocks: () => void;
export declare const setupMockSuccess: () => void;
export declare const setupMockFailure: (error?: Error) => void;
export { mockTikTokBusinessModule };
//# sourceMappingURL=setup.d.ts.map