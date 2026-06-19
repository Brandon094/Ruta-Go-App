package com.chopcode.rutago.app.models;

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

    public String getRouteName() { return routeName; }
    public int getReservations() { return reservations; }
    public int getAvailableSeats() { return availableSeats; }
    public int getColorRes() { return colorRes; }
}
