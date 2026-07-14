package com.chopcode.rutago.app.utils.security;

import android.text.method.HideReturnsTransformationMethod;
import android.text.method.PasswordTransformationMethod;

import com.chopcode.rutago.app.R;
import com.google.android.material.textfield.TextInputEditText;
import com.google.android.material.textfield.TextInputLayout;

/**
 * Security Utils
 *
 * Clase de utilidad para estandarizar comportamientos de seguridad en la interfaz de usuario.
 * Responsabilidades:
 * - Implementar el control de visibilidad para campos de contraseña (Toggle Visibility).
 * - Garantizar que el cursor del teclado se mantenga al final del texto tras el cambio de transformación.
 * - Centralizar el uso de iconos oficiales para la ofuscación de credenciales.
 */
public class SecurityUtils {

    /**
     * Configura el componente TextInputLayout para permitir mostrar/ocultar la contraseña.
     */
    public static void setupPasswordVisibilityToggle(TextInputLayout layout, TextInputEditText editText) {
        layout.setEndIconDrawable(R.drawable.ic_visibility_off);
        layout.setEndIconOnClickListener(v -> {
            if (editText.getTransformationMethod() instanceof PasswordTransformationMethod) {
                editText.setTransformationMethod(HideReturnsTransformationMethod.getInstance());
                layout.setEndIconDrawable(R.drawable.ic_visibility_on);
            } else {
                editText.setTransformationMethod(PasswordTransformationMethod.getInstance());
                layout.setEndIconDrawable(R.drawable.ic_visibility_off);
            }
            // Mantener el foco al final de la cadena tras el toggle
            if (editText.getText() != null) {
                editText.setSelection(editText.getText().length());
            }
        });
    }
}
