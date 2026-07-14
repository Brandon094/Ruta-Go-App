package com.chopcode.rutago.app.models;

/**
 * RouteStat Model
 *
 * Estructura de datos para el desglose estadístico por ruta en el Dashboard del conductor.
 * No se persiste en Firebase, se calcula localmente para la UI.
 */
public class RouteStat {
    private String routeName;
    private int reservations;
    private int availableSeats;
    private int colorRes;

    public RouteStat(String routeName, int reservations, int availableSeats, int colorRes) {
        this.routeName = routeName;
        this.reservations = reservations;
        this.availableSeats = availableSeats;
        this.colorRes = colorRes;
    }

    /**
     * @return Nombre del trayecto (ej: "06:15 AM - Ida").
     */
    public String getRouteName() { return routeName; }

    /**
     * @return Conteo de reservas confirmadas para esta ruta.
     */
    public int getReservations() { return reservations; }

    /**
     * @return Conteo de asientos aún disponibles.
     */
    public int getAvailableSeats() { return availableSeats; }

    /**
     * @return Recurso de color asociado para la visualización gráfica.
     */
    public int getColorRes() { return colorRes; }
}
