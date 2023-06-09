package org.flowxlang.runtime.type;

public class FloatType extends Type {
    private float value;

    public FloatType(float value) {
        this.value = value;
    }

    public float getValue() {
        return value;
    }
}