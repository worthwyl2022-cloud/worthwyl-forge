# WorthWyl Studio Verification Record

**Verification date:** 2026-10-02  
**Surface:** WorthWyl Studio hybrid creation/operator surface  
**Authority boundary:** Convertible Cranium Kernel only

This record covers the Studio web surface and its local governance-boundary adapter. It does not certify the complete Convertible Cranium ecosystem, legal ownership, acquisition value, Android release readiness, production deployment, or Kernel implementation.

## Current architecture

The Studio is aligned to the current Dual-Substrate / Quad-Engine authority architecture:

- Engine 1, Synapse: proposal, evidence, provenance, and D_A / D_B context derivation.
- Engine 2A, Substrate A / Jury A1 + A2: constitutional and policy authority assessment.
- Engine 2B, Substrate B / Jury B1 + B2: evidence-grounding assessment.
- Engine 3, Cranium Kernel: sole canonical convergence authority.
- Listener: untrusted ingress.
- Commander OS: operational control surface.
- Miracle Memory: governed continuity.
- Circuit Breaker / COMA: cross-cutting runtime containment and recovery.

The former Eight-Plane and Dual-Engine descriptions are historical framing only.

## Verification results

| Check | Command | Result |
|---|---|---|
| Architecture audit | `npm run audit:architecture` | **PASS** |
| TypeScript typecheck | `npm run lint` | **PASS** |
| Production client/server build | `npm run build` | **PASS** |
| Dependency install | `npm ci --ignore-scripts` | **PASS**, 293 packages audited, 0 vulnerabilities reported |
| Local transition adapter | `POST /api/substrate/evaluate-state-transition` | **Design hardened** as non-authoritative assessment; it explicitly returns `authorityIssued: false` and identifies the Kernel as canonical authority |
| Production server startup | `node dist/server.cjs` | **PASS**; server started successfully after Express 5 catch-all compatibility correction |
| Health endpoint | `GET /api/health` | **PASS**; HTTP 200 |
| Access status endpoint | `GET /api/access/status` | **PASS**; unconfigured mode explicitly reports disabled access rather than pretending a client-side gate is security |
| Protected API behavior | configured access mode | **PASS** at middleware level; protected routes return HTTP 401 without an authenticated session |
| AI provider fail-closed startup | `env -u GEMINI_API_KEY node dist/server.cjs` | **PASS**; process refuses to start rather than serving synthetic, simulated, stock, or heuristic AI substitutes |
| AI fallback removal | source audit of `server.ts` | **PASS**; provider-dependent generation paths no longer contain mock/synthetic response branches; provider errors return explicit failure responses |

## Security corrections in this revision

- Removed the hardcoded `CRANIUM2026` client credential.
- Removed browser-local password storage and client-side gate disabling.
- Added server-backed access control with an HttpOnly, SameSite session cookie when enabled.
- Protected API routes behind the server access boundary when configured.
- Reclassified the local transition route as a **preflight assessment**, not a receipt or authority engine.
- Explicitly return `canonicalAuthoritySource: "Convertible Cranium Kernel"`.
- Added an architecture audit that fails on active-source legacy architecture terminology and embedded credentials.
- Rebranded the public surface as **WorthWyl Studio** while retaining the Forge implementation as an internal workflow/creation engine.

## Build note

The Termux environment did not expose npm-installed executable shims under `node_modules/.bin`. The package scripts were therefore hardened to invoke the installed TypeScript, Vite, esbuild, and tsx entrypoints directly. The actual TypeScript and production build then completed successfully.

The Vite build reports a bundle-size warning for the main client chunk (~1.23 MB minified). This is a performance optimization item, not a correctness failure. It should be addressed with route-level code splitting before high-scale production deployment.

## Remaining evidence boundaries

- Android source exists but Android release readiness remains separately unverified.
- Kernel runtime authority claims remain governed by the Kernel's own evidence, not by Studio.
- Any fixture, simulation, deterministic offline result, or generated demonstration must remain labeled as such.
- Production access configuration must be supplied through deployment secrets; no credential belongs in source control.

## Acceptance statement

The current Studio surface is documentation- and build-aligned with the 2026-10-02 Convertible Cranium architecture baseline. No local Studio path is represented as a replacement for Kernel authority.
