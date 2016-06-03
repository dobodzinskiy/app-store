package com.dataart.appstore.entity;

public enum UserRoles {

    ROLE_USER("user"),
    ROLE_DEVELOPER("developer");

    private String value;

    UserRoles(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static UserRoles getEnum(String value) {
        for (UserRoles v : values())
            if (v.getValue().equalsIgnoreCase(value)) {
                return v;
            }

        throw new IllegalArgumentException(String.format("Cannot convert '%s' value to enum", value));
    }
}
