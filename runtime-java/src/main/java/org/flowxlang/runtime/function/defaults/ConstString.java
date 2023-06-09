package org.flowxlang.runtime.function.defaults;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.FloatType;
import org.flowxlang.runtime.type.StringType;
import org.flowxlang.runtime.type.column.Column;

public class ConstString extends Function {
    @Override
    public Column[] calc(Column[] inputs, Object data) {
        Column<StringType> out = new Column<>(1);
        out.setValue(0, new StringType((String) data));

        return new Column[] {
                out
        };
    }
}
