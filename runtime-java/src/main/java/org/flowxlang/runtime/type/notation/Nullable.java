package org.flowxlang.runtime.type.notation;

import org.flowxlang.runtime.type.Type;

public class Nullable<T extends Type> extends Type {
    private boolean isNull;
    private T value;

    public Nullable() {
        isNull = true;
    }

    public Nullable(T value) {
        isNull = false;
        this.value = value;
    }

    public T getValue() {
        return value;
    }

    public boolean getIsNull() {
        return isNull;
    }
}