package org.flowxlang.runtime.function;

import org.flowxlang.runtime.core.FunDefs;
import org.flowxlang.runtime.type.column.Column;

public abstract class Function {
    public abstract Column[] calc(Column[] inputs);

    protected Column[] call(String name, Column[] inputs) {
        return FunDefs.getInstance().find(name).calc(inputs);
    }
}