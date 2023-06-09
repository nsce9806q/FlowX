package org.flowxlang.runtime.function.defaults;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.IntType;
import org.flowxlang.runtime.type.column.Column;

public class ConstInt extends Function {
    @Override
    public Column[] calc(Column[] inputs, Object data) {
        Column<IntType> out = new Column<>(1);
        out.setValue(0, new IntType((Integer)data));

        return new Column[] {
                out
        };
    }
}
