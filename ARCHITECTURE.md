# WorthWyl Studio Architecture

## Product identity

**WorthWyl Studio** is the human-facing hybrid creation and operations environment.

**Forge** remains the internal workflow/creation engine. It is an implementation layer, not the public authority boundary.

## System boundary

Studio sits above the governed Convertible Cranium substrate. It can orchestrate bounded workflows and present evidence, but canonical authority remains outside the Studio.

### Current Convertible Cranium architecture

**Dual-Substrate / Quad-Engine authority path**

1. **Engine 1: Synapse** — proposal formation, bounded assessment, evidence capture, provenance, and D_A / D_B context derivation.
2. **Engine 2A: Substrate A / Jury A1 + A2** — constitutional and policy authority assessment: **May We?**
3. **Engine 2B: Substrate B / Jury B1 + B2** — evidence-grounding assessment: **Is It So?**
4. **Engine 3: Cranium Kernel** — canonical convergence, lineage verification, durable authority state, replay protection, denial/quarantine semantics, and receipts.

The jurors are independent bounded evaluators. Neither issues canonical authority.

### Canonical authority

The Convertible Cranium Kernel is the sole canonical authority source.

No Studio state, Forge workflow, model output, Synapse result, juror result, memory entry, browser state, receipt display, or external attestation can synthesize authority.

## Runtime flow

Listener → Commander/Studio operational context → Cranium AI proposal → Engine 1 Synapse → Engine 2A Substrate A / Jury A1+A2 → Engine 2B Substrate B / Jury B1+B2 → Engine 3 Cranium Kernel convergence → governed execution → receipt/lineage → Miracle Memory

Circuit Breaker / COMA can interrupt, quarantine, or roll back runtime execution without becoming an authority source.

## Studio responsibilities

- Creation workflows.
- Project/domain workspaces.
- Canon and continuity presentation.
- Diligence packaging.
- Benchmark/test visualization.
- Operator controls.
- Bounded AI-assisted authoring.
- Evidence navigation.

## Explicit non-responsibilities

Studio does not:
- replace the Kernel;
- define canonical semantics;
- issue canonical receipts;
- bypass the two governance-review paths;
- convert simulations, fixtures, or local state into evidence;
- silently promote provisional content into canonical state.

## Evidence rule

Every acquisition-grade claim must identify its source revision, verification command, actual result, and residual limitation. Missing evidence is represented as missing, not cosmetically converted into a green badge.

## Historical terminology

Eight-Plane and Dual-Engine are historical descriptions. They must not appear as current architecture labels.
