# Kernel Adoption Contract

This document is the release-enforced adoption contract for a supporting Cranium ecosystem repository.

**Contract ID:** `cranium-kernel-adoption-v1`
**Authority source:** [cranium-kernel](https://github.com/worthwyl2022-cloud/cranium-kernel)
**Canonical semantic contract:** [CANONICAL_SEMANTIC_CONTRACT.json](https://github.com/worthwyl2022-cloud/cranium-kernel/blob/main/docs/CANONICAL_SEMANTIC_CONTRACT.json)

> **Cognition may come from anywhere. Authority comes only through Cranium.**

## Authority boundary

Only `cranium-kernel` may evaluate, reduce, replay-protect, journal, persist canonical state, issue canonical receipts, or grant authority. Supporting repositories may submit requests, consume verified receipts, or present bounded evidence; they must not grant authority, mutate canonical state, issue canonical receipts, or define competing semantics.

## Evidence and state

Local state, browser state, fixtures, generated reports, screenshots, model output, simulations, and historical material are non-canonical. Release and acquisition claims must identify the source commit, exact verification command, actual result, and any residual limitation; unverified or unavailable evidence must remain labeled as such.

## Local release gate

Before a release is eligible, this repository must execute `./scripts/audit-kernel-alignment.sh` successfully in CI. The audit verifies this immutable adoption statement, confirms the repository retains its local alignment record, and confirms that a release workflow invokes the audit. A failed or unavailable audit is not a pass and must block release promotion.
