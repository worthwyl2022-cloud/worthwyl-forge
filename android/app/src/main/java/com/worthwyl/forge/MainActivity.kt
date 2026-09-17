package com.worthwyl.forge

import android.app.Activity
import android.graphics.Color
import android.os.Bundle
import android.view.Gravity
import android.widget.LinearLayout
import android.widget.ScrollView
import android.widget.TextView
import com.worthwyl.forge.core.CapabilityStatus
import com.worthwyl.forge.core.ForgeCore

class MainActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val snapshot = ForgeCore.readiness()
        val content = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(48, 56, 48, 48)
            setBackgroundColor(Color.rgb(16, 16, 20))
        }

        content.addView(label("WORTHWYL FORGE", 14f, Color.rgb(167, 139, 250)))
        content.addView(label("Android product shell", 28f, Color.WHITE))
        content.addView(label("Standalone native boundary · ${snapshot.contractVersion}", 14f, Color.LTGRAY))
        content.addView(spacer(28))
        content.addView(label("Readiness is reported, not implied", 18f, Color.WHITE))
        content.addView(label("This app is the first Android product boundary for Forge. It exposes the platform-neutral contract and states which capabilities are not yet established.", 15f, Color.LTGRAY))
        content.addView(spacer(22))

        snapshot.capabilities.forEach { capability ->
            val statusColor = when (capability.status) {
                CapabilityStatus.IMPLEMENTED -> Color.rgb(74, 222, 128)
                CapabilityStatus.NOT_CONFIGURED -> Color.rgb(251, 191, 36)
                CapabilityStatus.NOT_ESTABLISHED -> Color.rgb(248, 113, 113)
            }
            content.addView(label("${capability.status.name}: ${capability.id}", 15f, statusColor))
            content.addView(label(capability.evidence, 13f, Color.LTGRAY))
            content.addView(spacer(12))
        }

        val scroll = ScrollView(this).apply { addView(content) }
        setContentView(scroll)
    }

    private fun label(text: String, size: Float, color: Int) = TextView(this).apply {
        this.text = text
        textSize = size
        setTextColor(color)
        gravity = Gravity.START
    }

    private fun spacer(height: Int) = TextView(this).apply {
        layoutParams = LinearLayout.LayoutParams(1, height)
    }
}
