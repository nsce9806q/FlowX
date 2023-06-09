package org.flowxlang.runtime.function.defaults;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.BoolType;
import org.flowxlang.runtime.type.StringType;
import org.flowxlang.runtime.type.column.Column;

public class ConstBool extends Function {
    @Override
    public Column[] calc(Column[] inputs, Object data) {
        Column<BoolType> out = new Column<>(1);
        out.setValue(0, new BoolType((boolean) data));

        return new Column[] {
                out
        };
    }
}
