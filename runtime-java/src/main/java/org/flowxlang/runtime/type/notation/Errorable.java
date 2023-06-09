package org.flowxlang.runtime.type.notation;

import org.flowxlang.runtime.type.Type;

public class Errorable<T extends Type> extends Type {
    private boolean isError;
    private T value;

    public Errorable() {
        isError = true;
    }

    public Errorable(T value) {
        isError = false;
        this.value = value;
    }

    public T getValue() {
        return value;
    }

    public boolean getIsError() {
        return isError;
    }
}