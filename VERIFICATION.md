# WorthWyl Forge Verification Record

## Scope

This record covers the Forge web surface, the new Android product boundary, and the platform-neutral shared core. It does not certify the complete account-wide ecosystem or establish legal ownership, licensing, acquisition value, production deployment, or Android release readiness.

## Results

| Surface | Command | Result | Evidence |
|---|---|---|---|
| Forge web typecheck | `npm run lint` | **PASS** | TypeScript completed with exit code 0 on 2026-09-17 in the sandbox |
| Forge web production build | `npm run build` | **PASS** | Vite client and bundled server completed with exit code 0 on 2026-09-17 |
| Forge shared-core tests | `cd android && ./gradlew :shared-core:test` | **NOT PASS** | Local machine lacks a usable Java 21 compiler/toolchain; hosted CI is required |
| Forge Android unit tests | `cd android && ./gradlew :app:test` | **NOT PASS** | Local machine has no Android SDK configured |
| Forge debug APK assembly | `cd android && ./gradlew :app:assembleDebug` | **NOT PASS** | Local machine lacks Android SDK and a usable Java compiler toolchain |
| Boot-drive structure | `./HEALTH_CHECK.sh` | **PASS** | All required control files and seven product directories were present |
| Canonical TypeScript kernel | `npm run lint`, `npm run build` | **PASS** | Typecheck/build completed with exit code 0 |
| Canonical authority conformance | `npm run verify:conformance` | **PASS** | 8 of 8 vectors passed; 0 failed |
| Forge authority adapter | POST `/api/substrate/evaluate-state-transition` | **PASS** | Allowed transition, fail-closed violation response, and deterministic replay receipt verified locally |

## Interpretation

The web Forge remains build-verified in this environment. The Android source boundary exists and includes a native launcher activity, a platform-neutral Kotlin core, a unit test, and a dedicated CI workflow. **Android is not build-verified yet.** The correct status is `NOT PASS` until the hosted Android workflow completes successfully on a clean runner.

The Forge web authority adapter now reports the canonical protocol version, hashes its request material with SHA-256, rejects simulated lane bypasses, dangling causal traces, empty payloads, invalid tiers, and escalation spikes, and returns the original receipt for an identical replay. This is an adapter-level verification; it does not replace the canonical Kernel's persisted authority engine.

The Android shell deliberately reports `NOT_CONFIGURED` and `NOT_ESTABLISHED` for remote inference, external actions, durable synchronization, and the complete Forge workspace. Those statuses are product behavior, not missing marketing language.

## Required acquisition disclosure

Do not describe WorthWyl Forge as a fully ported or Android-release-ready product based on this commit alone. The evidence supports the narrower statement that Forge has a separately scoped Android product boundary under active verification, while the existing web/server surface is build-verified.

## Reproduction

```bash
npm ci
npm run lint
npm run build
cd android
./gradlew :shared-core:test --no-daemon --stacktrace
./gradlew :app:test --no-daemon --stacktrace
./gradlew :app:assembleDebug --no-daemon --stacktrace
```

The Android commands require JDK 21 with a compiler, Android SDK platform 35, and build tools 35.0.0. The repository workflow installs and invokes those dependencies explicitly.
