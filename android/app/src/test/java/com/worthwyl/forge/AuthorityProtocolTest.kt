package com.worthwyl.forge

import com.worthwyl.forge.core.AuthorityClass
import com.worthwyl.forge.core.AuthorityLevel
import com.worthwyl.forge.core.AuthorityProposal
import com.worthwyl.forge.core.AuthorityProtocol
import com.worthwyl.forge.core.BoundaryDecision
import kotlin.test.Test
import kotlin.test.assertEquals

class AuthorityProtocolTest {
    @Test
    fun factual_promotion_without_verified_evidence_fails_closed() {
        val proposal = AuthorityProposal(
            requestId = "proposal-1",
            idempotencyKey = "replay-1",
            subjectId = "subject-1",
            requestedAuthority = AuthorityLevel(AuthorityClass.FACTUAL, 0.8),
            evidence = emptyList(),
            justification = "test",
            requesterId = "forge-android",
            timestamp = 1760000000000,
            targetAuthorityVersion = 1,
        )

        assertEquals(
            BoundaryDecision.Deny("INSUFFICIENT_EVIDENCE", "Factual or higher authority requires verified SHA-256 evidence."),
            AuthorityProtocol.validateShape(proposal),
        )
    }
}
