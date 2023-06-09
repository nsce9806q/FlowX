package org.flowxlang.runtime.type;

public class StringType extends Type {
    private String value;

    public StringType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}