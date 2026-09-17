# WorthWyl Forge

WorthWyl Forge is the public demonstration and operator surface for the WorthWyl/Cranium portfolio. It presents governed AI infrastructure, cognitive-substrate research, deterministic evidence harnesses, and media-oriented work through a runnable React/Vite application rather than a static concept page.

## Demonstration boundaries

Forge is a presentation and integration surface. It does **not** independently grant authority, replace the canonical private control plane, or constitute independent security certification. Proprietary authority, receipt, and recovery implementations are maintained in private repositories for controlled acquisition diligence.

The application can present deterministic benchmark and receipt artifacts when those artifacts are preserved with their source version and execution record. It must not represent internal benchmark output as external production performance.

## What is implemented here

- Browser application under `src/`.
- Express entrypoint in `server.ts`.
- Public-facing substrate and evidence presentation area.
- Deterministic demonstration paths.
- Explicit provider configuration boundaries for live model features.

## Run locally

```bash
npm ci
npm run lint
npm run build
npm run dev
```

Live model features require an explicitly configured provider key. Keep credentials in an ignored local environment file or deployment secret manager. Never commit provider keys, Firebase credentials, or generated archives.

## Platform architecture

| Layer | Role | Diligence status |
|---|---|---|
| Core | Governed authority and transaction decisions | Private implementation; controlled buyer access |
| Synapse | Attestation and risk-boundary contracts | Private implementation; controlled buyer access |
| Kernel | Receipts, replay controls, recovery, and governed memory | Private implementation; reproducible evidence package |
| Forge | Public demonstration and operator surface | Public presentation layer |

## Evidence standard

Every security or performance statement should identify its source commit, command, result, and limitation. Internal stress tests are valuable engineering evidence but are not represented as independent third-party validation.

## Ownership and licensing

See the repository license and security policy for applicable terms. This README describes the public demonstration surface and intentionally separates it from the private implementation portfolio.

## WorthWyl ownership and review entry point

The Cranium Ecosystem is presented through **Convertible Cranium Engineering**, the software and engineering division of **WorthWyl Media**. Commercial licensing and related technical assets are intended to be handled through **WorthWyl LLC**. **WorthWyl Foundation** is a separate nonprofit branch. See [`RIGHTS-AND-LICENSING.md`](./RIGHTS-AND-LICENSING.md) for the ownership boundary.

Visual overview: [`assets/cranium-architecture.svg`](./assets/cranium-architecture.svg).

Public review package: [`cranium-portfolio/public-review`](https://github.com/worthwyl2022-cloud/cranium-portfolio/tree/main/public-review).
