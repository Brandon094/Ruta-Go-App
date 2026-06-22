# 🚀 Ruta-Go ProGuard Rules - Stable v1.2.1

# --- Firebase & Google Play Services ---
-keep class com.google.firebase.** { *; }
-keep class com.google.android.gms.** { *; }
-dontwarn com.google.firebase.**
-dontwarn com.google.android.gms.**

# --- Gson (Para evitar errores en modelos de datos) ---
-keepattributes Signature
-keepattributes *Annotation*
-keep class com.chopcode.rutago.app.models.** { *; }
-keep class com.google.gson.** { *; }

# --- Glide ---
-keep public class * extends com.bumptech.glide.module.AppGlideModule
-keep public class * extends com.bumptech.glide.module.LibraryGlideModule
-keep class com.bumptech.glide.** { *; }
-dontwarn com.bumptech.glide.**

# --- ViewModel & LiveData ---
-keepclassmembers class androidx.lifecycle.** { *; }

# --- Keep resource names (Para evitar errores en layouts dinámicos) ---
-keepclassmembers class **.R$* {
    public static <fields>;
}

# --- Prevent obfuscation of native methods ---
-keepclasseswithmembernames class * {
    native <methods>;
}

# --- Multidex ---
-keep class androidx.multidex.** { *; }
