plugins {
    id("org.jetbrains.kotlin.jvm")
}

group = "com.worthwyl.forge"
version = "0.1.0"

kotlin {
    jvmToolchain(21)
}

dependencies {
    testImplementation(kotlin("test"))
}

tasks.test {
    useJUnitPlatform()
}
