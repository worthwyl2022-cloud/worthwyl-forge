#!/usr/bin/env bash
set -euo pipefail
root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$root"
fail=0
scan='README.md ARCHITECTURE.md AUTHORITY_ROLE.md CATEGORY_POSITION.md CONTRACT_ALIGNMENT.md KERNEL_ADOPTION_CONTRACT.md VERIFICATION.md server.ts'
for f in $scan; do
  [[ -f "$f" ]] || { echo "MISSING: $f"; fail=1; }
done
[[ -d src ]] || { echo "MISSING: src"; fail=1; }
if grep -nE 'CRANIUM2026|cranium_custom_password|cranium_auth_token|cranium_gate_enabled' src server.ts README.md ARCHITECTURE.md AUTHORITY_ROLE.md CATEGORY_POSITION.md CONTRACT_ALIGNMENT.md KERNEL_ADOPTION_CONTRACT.md 2>/dev/null; then
  echo "FAIL: embedded/default client credential material remains"; fail=1
fi
if grep -RInE 'Eight-Plane|Dual-Engine|eight-plane|dual-engine|multi-plane cognitive governance' src server.ts --exclude='*.map' 2>/dev/null; then
  echo "FAIL: retired architecture terminology remains in active product source"; fail=1
fi
if grep -nE 'transitionReceipts' server.ts src/App.tsx src/core src/components 2>/dev/null; then
  echo "FAIL: obsolete local receipt authority state remains"; fail=1
fi
if ! grep -q 'canonicalAuthoritySource: "Convertible Cranium Kernel"' server.ts; then
  echo "FAIL: local transition assessment does not identify Kernel authority"; fail=1
fi
if ! grep -q 'authorityIssued: false' server.ts; then
  echo "FAIL: local transition assessment does not explicitly deny authority issuance"; fail=1
fi
if ! grep -q 'WORTHWYL_STUDIO_ACCESS_SECRET' server.ts; then
  echo "FAIL: server-backed Studio access boundary missing"; fail=1
fi
if ! grep -q 'HttpOnly' src/components/AccessGate.tsx; then
  echo "FAIL: client access surface does not document HttpOnly session boundary"; fail=1
fi
if ! grep -q 'Dual-Substrate / Quad-Engine' README.md ARCHITECTURE.md; then
  echo "FAIL: current architecture baseline missing from product docs"; fail=1
fi
if (( fail )); then echo "ARCHITECTURE AUDIT: FAIL"; exit 1; fi
echo "ARCHITECTURE AUDIT: PASS"
