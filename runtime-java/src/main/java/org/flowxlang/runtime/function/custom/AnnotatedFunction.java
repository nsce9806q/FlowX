package org.flowxlang.runtime.function.custom;

import org.flowxlang.runtime.core.FunDefs;
import org.flowxlang.runtime.function.Function;

public class AnnotatedFunction {
    private Function function;
    private Object data;

    public AnnotatedFunction(String function, Object data) {
        this.function = FunDefs.getInstance().find(function);
        this.data = data;
    }

    public AnnotatedFunction(String function) {
        this.function = FunDefs.getInstance().find(function);
        this.data = null;
    }

    public Object getData() {
        return data;
    }
}
