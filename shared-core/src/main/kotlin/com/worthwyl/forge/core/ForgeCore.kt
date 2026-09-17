package com.worthwyl.forge.core

/**
 * Platform-neutral product contract for the Forge client surfaces.
 * This module contains no Android, browser, filesystem, network, or provider code.
 */
object ForgeCore {
    const val PRODUCT_ID = "worthwyl-forge"
    const val CONTRACT_VERSION = "forge-core-v1"

    fun readiness(): ReadinessSnapshot = ReadinessSnapshot(
        productId = PRODUCT_ID,
        contractVersion = CONTRACT_VERSION,
        capabilities = listOf(
            Capability("workspace_catalog", CapabilityStatus.IMPLEMENTED, "Native shell exposes a local workspace catalog."),
            Capability("substrate_boundary", CapabilityStatus.IMPLEMENTED, "The shell reports the shared-core contract version."),
            Capability("remote_inference", CapabilityStatus.NOT_CONFIGURED, "No provider or credential is bundled."),
            Capability("external_actions", CapabilityStatus.NOT_CONFIGURED, "No connector or approval runtime is bundled."),
            Capability("durable_sync", CapabilityStatus.NOT_ESTABLISHED, "No Android persistence or synchronization implementation is claimed."),
            Capability("full_forge_workspace", CapabilityStatus.NOT_ESTABLISHED, "The existing web workspace has not been ported to Android."),
        ),
    )
}

data class ReadinessSnapshot(
    val productId: String,
    val contractVersion: String,
    val capabilities: List<Capability>,
)

data class Capability(
    val id: String,
    val status: CapabilityStatus,
    val evidence: String,
)

enum class CapabilityStatus {
    IMPLEMENTED,
    NOT_CONFIGURED,
    NOT_ESTABLISHED,
}
