package org.flowxlang.runtime.type;

public class BoolType extends Type {
    private boolean value;

    public BoolType(boolean value) {
        this.value = value;
    }

    public boolean getValue() {
        return value;
    }
}