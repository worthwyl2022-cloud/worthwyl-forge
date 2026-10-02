# WorthWyl Studio Architecture

## Product identity

**WorthWyl Studio** is the human-facing hybrid creation and operations environment.

**Forge** remains the internal workflow/creation engine. It is an implementation layer, not the public authority boundary.

## System boundary

Studio sits above the governed Convertible Cranium substrate. It can orchestrate bounded workflows and present evidence, but canonical authority remains outside the Studio.

### Current Convertible Cranium architecture

**Dual-Substrate / Quad-Engine**

1. Cranium AI — intelligence and orchestration.
2. Synapse — evidence and assessment.
3. Governance Review Juror One — constructive review.
4. Governance Review Juror Two — adversarial review.

The jurors deliberately use different review mandates and processes. Neither is authoritative.

### Canonical authority

The Convertible Cranium Kernel is the sole canonical authority source.

No Studio state, Forge workflow, model output, Synapse result, juror result, memory entry, browser state, receipt display, or external attestation can synthesize authority.

## Runtime flow

Listener → Studio/Commander operational context → AI proposal → Synapse assessment → Juror One / Juror Two review → governed request → Kernel decision → execution → receipt → Miracle Memory

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
