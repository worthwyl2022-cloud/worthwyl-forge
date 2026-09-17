package com.worthwyl.forge

import com.worthwyl.forge.core.CapabilityStatus
import com.worthwyl.forge.core.ForgeCore
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class ForgeCoreTest {
    @Test
    fun readiness_is_explicit_about_unestablished_capabilities() {
        val snapshot = ForgeCore.readiness()

        assertEquals("worthwyl-forge", snapshot.productId)
        assertEquals("forge-core-v1", snapshot.contractVersion)
        assertTrue(snapshot.capabilities.any { it.id == "workspace_catalog" && it.status == CapabilityStatus.IMPLEMENTED })
        assertTrue(snapshot.capabilities.any { it.id == "full_forge_workspace" && it.status == CapabilityStatus.NOT_ESTABLISHED })
        assertTrue(snapshot.capabilities.any { it.id == "external_actions" && it.status == CapabilityStatus.NOT_CONFIGURED })
    }
}
