#!/usr/bin/env sh
set -eu
root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$root"
failures=0
fail() { printf '%s\n' "KERNEL_ALIGNMENT_FAIL: $1" >&2; failures=$((failures + 1)); }
require_file() { test -s "$1" || fail "required file is missing or empty: $1"; }
require_text() { grep -F -- "$2" "$1" >/dev/null 2>&1 || fail "required statement is absent from $1: $2"; }
contract='KERNEL_ADOPTION_CONTRACT.md'
alignment='CONTRACT_ALIGNMENT.md'
require_file "$contract"
require_file "$alignment"
require_text "$contract" '# Kernel Adoption Contract'
require_text "$contract" '**Contract ID:** `cranium-kernel-adoption-v1`'
require_text "$contract" '**Authority source:** [cranium-kernel](https://github.com/worthwyl2022-cloud/cranium-kernel)'
require_text "$contract" '> **Cognition may come from anywhere. Authority comes only through Cranium.**'
require_text "$contract" 'Only `cranium-kernel` may evaluate, reduce, replay-protect, journal, persist canonical state, issue canonical receipts, or grant authority.'
require_text "$alignment" 'cranium-kernel'
if ! find .github/workflows -type f \( -name '*.yml' -o -name '*.yaml' \) -exec grep -F -l -- './scripts/audit-kernel-alignment.sh' {} + 2>/dev/null | grep -q .; then
  fail 'no GitHub Actions workflow invokes ./scripts/audit-kernel-alignment.sh'
fi
if [ "$failures" -ne 0 ]; then printf '%s\n' "KERNEL_ALIGNMENT_SUMMARY: FAIL failures=$failures" >&2; exit 1; fi
printf '%s\n' 'KERNEL_ALIGNMENT_SUMMARY: PASS contract=cranium-kernel-adoption-v1 authority=cranium-kernel'
