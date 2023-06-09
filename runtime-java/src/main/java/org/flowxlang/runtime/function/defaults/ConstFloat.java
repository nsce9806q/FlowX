package org.flowxlang.runtime.function.defaults;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.FloatType;
import org.flowxlang.runtime.type.IntType;
import org.flowxlang.runtime.type.column.Column;

public class ConstFloat extends Function {
    @Override
    public Column[] calc(Column[] inputs, Object data) {
        Column<FloatType> out = new Column<>(1);
        out.setValue(0, new FloatType((Float)data));

        return new Column[] {
                out
        };
    }
}
