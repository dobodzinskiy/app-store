package com.dataart.appstore.entity;

public enum ApplicationType {

    GAMES("Games"),
    MULTIMEDIA("Multimedia"),
    PRODUCTIVITY("Productivity"),
    TOOLS("Tools"),
    HEALTH("Health"),
    LIFESTYLE("Lifestyle"),
    ART("Art");

    private String value;

    ApplicationType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static ApplicationType getEnum(String value) {
        for (ApplicationType v : values())
            if (v.getValue().equalsIgnoreCase(value)) {
                return v;
            }

        throw new IllegalArgumentException(String.format("Cannot convert '%s' value to enum", value));
    }
}
