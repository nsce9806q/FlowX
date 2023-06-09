package org.flowxlang.runtime.type;

public class IntType extends Type {
    private int value;

    public IntType(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}