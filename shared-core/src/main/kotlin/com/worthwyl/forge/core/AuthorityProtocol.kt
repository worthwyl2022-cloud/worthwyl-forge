package com.worthwyl.forge.core

/** Platform-neutral proposal contract aligned with cranium-authority-protocol v1. */
enum class AuthorityClass(val rank: Int) {
    HYPOTHETICAL(0),
    WORKING(1),
    USER(2),
    FACTUAL(3),
    ENTERPRISE(4),
    SYSTEM(5),
}

data class AuthorityLevel(
    val authorityClass: AuthorityClass,
    val weight: Double,
) {
    init {
        require(weight in 0.0..1.0) { "Authority weight must be in [0.0, 1.0]" }
    }
}

data class EvidenceReference(
    val id: String,
    val uri: String,
    val sha256Digest: String,
    val verified: Boolean,
)

data class AuthorityProposal(
    val requestId: String,
    val idempotencyKey: String,
    val subjectId: String,
    val requestedAuthority: AuthorityLevel,
    val evidence: List<EvidenceReference>,
    val justification: String,
    val requesterId: String,
    val timestamp: Long,
    val targetAuthorityVersion: Long,
    val namespace: String? = null,
)

sealed interface BoundaryDecision {
    data object Allow : BoundaryDecision
    data class Deny(val code: String, val explanation: String) : BoundaryDecision
}

object AuthorityProtocol {
    const val VERSION = "cranium-authority-protocol-v1.0.0"

    fun validateShape(proposal: AuthorityProposal): BoundaryDecision {
        if (proposal.requestId.isBlank() || proposal.idempotencyKey.isBlank() || proposal.subjectId.isBlank()) {
            return BoundaryDecision.Deny("INVALID_REQUEST", "Request, idempotency, and subject identifiers are required.")
        }
        if (proposal.requestedAuthority.authorityClass.rank >= AuthorityClass.FACTUAL.rank &&
            proposal.evidence.none { it.verified && it.sha256Digest.length == 64 }) {
            return BoundaryDecision.Deny("INSUFFICIENT_EVIDENCE", "Factual or higher authority requires verified SHA-256 evidence.")
        }
        return BoundaryDecision.Allow
    }
}
