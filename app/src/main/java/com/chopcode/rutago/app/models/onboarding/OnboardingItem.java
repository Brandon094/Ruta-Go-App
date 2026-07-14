package com.chopcode.rutago.app.models.onboarding;

/**
 * OnboardingItem Model
 *
 * Estructura de datos para los slides de bienvenida.
 * Almacena el recurso de imagen, el título y la descripción de cada paso.
 */
public class OnboardingItem {
    private final int image;
    private final String title;
    private final String description;

    public OnboardingItem(int image, String title, String description) {
        this.image = image;
        this.title = title;
        this.description = description;
    }

    /**
     * @return Recurso drawable de la ilustración.
     */
    public int getImage() { return image; }

    /**
     * @return Título corto del slide.
     */
    public String getTitle() { return title; }

    /**
     * @return Descripción detallada de la funcionalidad.
     */
    public String getDescription() { return description; }
}
