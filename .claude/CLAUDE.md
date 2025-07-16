# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Native bridge for the TikTok Business SDK, enabling JavaScript apps to initialize the TikTok SDK, identify users, and track various events (standard, content, and custom events). The library supports both iOS and Android platforms.

## Development Commands

### Basic Commands
- **Build**: `yarn prepare` (uses react-native-builder-bob)
- **Test**: `yarn test` (Jest with 93.75% coverage)
- **Lint**: `yarn lint` (ESLint on JS/TS/TSX files)
- **Type Check**: `yarn typecheck` (TypeScript compiler)
- **Clean**: `yarn clean` (removes build artifacts)
- **Release**: `yarn release` (uses release-it)

### Testing Commands
- **All tests**: `yarn test`
- **With coverage**: `yarn test --coverage`
- **Watch mode**: `yarn test --watch`
- **Specific test file**: `yarn test src/__tests__/index.test.tsx`
- **Exclude error handling tests**: `yarn test --testPathIgnorePatterns="error-handling.test.tsx"`
- **Run quality checks**: `yarn test && yarn lint && yarn typecheck`

## Project Architecture

### Core Structure
- **src/index.tsx**: Main entry point exposing the TikTokBusiness module and all enums
- **android/**: Kotlin implementation (TikTokBusinessModule.kt, TikTokBusinessPackage.kt)
- **ios/**: Swift implementation (TikTokBusinessModule.swift)
- **example/**: Demo app showing SDK usage

### Key Components

#### JavaScript Bridge (src/index.tsx)
- Exports main `TikTokBusiness` object with methods: `initializeSdk`, `identify`, `logout`, `trackEvent`, `trackContentEvent`, `trackCustomEvent`
- Defines enums for event names and parameters:
  - `TikTokEventName`: Standard events (REGISTRATION, LOGIN, etc.)
  - `TikTokContentEventName`: Content events (ADD_TO_CART, PURCHASE, etc.)
  - `TikTokContentEventParameter`: Event parameters
  - `TikTokContentEventContentsParameter`: Content item parameters

#### Native Modules
- **Android**: `android/src/main/java/com/tiktokbusiness/TikTokBusinessModule.kt`
- **iOS**: `ios/TikTokBusinessModule.swift`
- Both implement the same interface for SDK initialization and event tracking

### Build System
- Uses `react-native-builder-bob` for building CommonJS, ES Module, and TypeScript definitions
- Outputs to `lib/` directory with separate commonjs, module, and typescript folders
- TypeScript configuration in `tsconfig.json` with strict mode enabled

### Testing Architecture
- **Comprehensive test suite** with 70+ tests achieving 93.75% coverage
- **Test files structure**:
  - `index.test.tsx`: Core functionality unit tests for all SDK methods
  - `edge-cases.test.tsx`: Edge cases, error handling, and performance scenarios
  - `integration.test.tsx`: Complete user flow tests (e-commerce, gaming scenarios)
  - `types.test.ts`: TypeScript type validation and enum testing
  - `error-handling.test.tsx`: Native module linking error scenarios
  - `setup.ts`: Test configuration, mocking utilities, and custom matchers
- **Native module mocking**: Comprehensive mock setup for React Native bridge testing
- **Coverage configuration**: Excludes test files, includes TypeScript sources
- **Custom Jest matchers**: Extended assertions for event tracking validation

### Code Quality
- ESLint with React Native and Prettier configs
- Commitlint for conventional commits
- Lefthook for git hooks
- Release-it for automated releases with conventional changelog

## Key Development Patterns

### Error Handling
- Main module uses Proxy pattern for graceful failure when native module isn't linked
- All native methods are async and return promises
- Error handling tests use `await expect(async () => {...}).rejects.toThrow()` pattern

### Event Tracking Architecture
- **Standard events**: Use `TikTokEventName` enum with optional properties
- **Content events**: Use `TikTokContentEventName` with structured parameters via enums
- **Custom events**: Accept any event name with flexible properties
- **Parameter validation**: TypeScript enums ensure consistent parameter naming

### Testing Best Practices
- Mock native modules in `setup.ts` for consistent test environment
- Use `jest.resetModules()` for testing module linking errors
- Test both success and failure scenarios for all methods
- Include integration tests for complete user flows

## Important Notes

- The library requires native linking (not compatible with Expo Go)
- Android requires ProGuard rules for TikTok classes: `-keep class com.tiktok.** { *; }`
- All native methods are async and return promises
- Error handling tests may show expected errors in console - this is normal behavior