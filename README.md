# WorthWyl Studio

**Status:** Acquisition-facing creation, operations, and governance surface. Supporting/non-canonical.

WorthWyl Studio is the hybrid evolution of the former WorthWyl Forge surface. The **Studio** is the product/operator identity; the retained **Forge engine** is the internal workflow and creation machinery. This preserves the useful implementation while retiring Forge as the public product name.

## Current architecture

WorthWyl Studio participates in Convertible Cranium's **Dual-Substrate / Quad-Engine** architecture:

- **Cranium AI**: intelligence and orchestration.
- **Synapse**: evidence and assessment.
- **Governance Review Juror One**: constructive coherence and evidence-sufficiency review.
- **Governance Review Juror Two**: adversarial contradiction and boundary review.

The jurors have intentionally different mandates and processes. Neither issues authority.

**Convertible Cranium Kernel is the sole canonical authority source.**

Studio runtime surfaces:
- **Commander OS**: operational control surface.
- **Cranium Listener**: untrusted ingress.
- **Miracle Memory**: governed continuity.
- **Circuit Breaker / COMA**: cross-cutting runtime containment and recovery.
- **WorthWyl Studio**: human-facing creation, operations, diligence, and project workspace.
- **Forge engine**: internal workflow/creation machinery retained as an implementation layer, not an authority source.

## Authority boundary

Studio may propose, collect, transform, assess, visualize, and present. It may not:
- issue canonical authority;
- issue canonical receipts;
- mutate canonical Kernel state directly;
- redefine Kernel semantics;
- treat browser/local state as canonical;
- represent a simulation or fixture as production evidence.

Local assessments are explicitly non-authoritative and identify the Kernel as the canonical authority source.

## Security boundary

Diligence access is server-backed when enabled through:
- `WORTHWYL_STUDIO_ACCESS_ENABLED=true`
- `WORTHWYL_STUDIO_ACCESS_CODE`
- `WORTHWYL_STUDIO_ACCESS_SECRET`

Credentials are not embedded in client code or browser storage. Authenticated sessions use an HttpOnly, SameSite cookie with a bounded lifetime.

If access is not configured, the application reports that fact rather than exposing a fake security gate.

## Verification

Required local verification:

```bash
npm ci
npm run lint
npm run build
npm test
npm run audit:architecture
```

Android verification remains separate and must not be represented as complete until the required Android toolchain and CI evidence pass.

## Historical terminology

The former **Eight-Plane** and **Dual-Engine** descriptions are historical framing only. They are not the current governance architecture.

## Product thesis

**WorthWyl Studio is where the human operates the work. Convertible Cranium is where authority is governed.**

