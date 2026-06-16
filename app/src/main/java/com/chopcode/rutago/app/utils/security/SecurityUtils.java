package com.chopcode.rutago.app.utils.security;

import android.text.method.HideReturnsTransformationMethod;
import android.text.method.PasswordTransformationMethod;

import com.chopcode.rutago.app.R;
import com.google.android.material.textfield.TextInputEditText;
import com.google.android.material.textfield.TextInputLayout;

public class SecurityUtils {

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
            if (editText.getText() != null) editText.setSelection(editText.getText().length());
        });
    }
}
