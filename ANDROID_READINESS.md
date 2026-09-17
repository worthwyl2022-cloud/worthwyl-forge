# WorthWyl Forge Android Readiness

## Current status

WorthWyl Forge now contains a separately scoped Android product boundary under `android/` and a platform-neutral Kotlin core under `shared-core/`. The Android application is a native shell that reports the shared-core contract and explicit capability status.

This is **not** a claim that the complete web Forge workspace has been ported to Android. The full workspace, provider integrations, remote inference, durable synchronization, and external actions remain **not established** on Android.

## Boundary

The `shared-core` module contains product identity, contract versioning, and capability/readiness data. It has no Android, browser, filesystem, network, database, or provider imports. The Android application depends on that module and owns only the native activity and presentation shell.

The existing web/server Forge remains a separate product surface. It is currently verified by its TypeScript lint and production build. The two surfaces share a declared product contract, but they do not yet share the complete Forge workspace implementation.

## Evidence-backed status

| Capability | Status | Evidence |
|---|---|---|
| Native Android launcher boundary | Implemented in source | `android/app/src/main/AndroidManifest.xml`, `MainActivity.kt` |
| Platform-neutral Forge core contract | Implemented in source | `shared-core/src/main/kotlin/com/worthwyl/forge/core/ForgeCore.kt` |
| Shared-core unit test | Implemented in source | `ForgeCoreTest.kt` |
| Full Forge workspace on Android | Not established | Existing workspace is under the web `src/` tree |
| Remote inference | Not configured | No provider or credential is bundled |
| External actions | Not configured | No connector or approval runtime is bundled |
| Durable Android sync | Not established | No Android persistence/synchronization implementation is included |

## Verification

From the Forge repository:

```bash
npm ci
npm run lint
npm run build
cd android
./gradlew test
./gradlew assembleDebug
```

A result is **PASS** only when the command completes successfully under a machine with the declared Android SDK, JDK, and Gradle toolchain. A machine without those tools must report **NOT_RUN**, not PASS.

## Next bounded work

The next implementation phase should port one user-visible Forge workflow at a time into the Android shell. Each port must reuse the shared-core contract, preserve the Constitution's distinction between recommendation and authorization, and add platform-specific tests before being described as Android capability.
