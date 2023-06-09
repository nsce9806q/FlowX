package org.flowxlang.runtime.type;

import org.flowxlang.runtime.core.FunDefs;
import org.flowxlang.runtime.function.Function;

public class FuncType extends Type {
    private String value;

    public FuncType(String value) {
        this.value = value;
    }

    public Function getValue() {
        return FunDefs.getInstance().find(value);
    }
}