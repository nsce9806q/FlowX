package org.flowxlang.runtime.function.defaults.stringfunc;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.IntType;
import org.flowxlang.runtime.type.StringType;
import org.flowxlang.runtime.type.column.Column;

public class LengthString extends Function {
    @Override
    public Column[] calc(Column[] inputs) {
        int row = getRow(inputs);
        Column<IntType> out = new Column<>(row);

        for (int i = 0; i < row; i++) {
            StringType a = ((Column<StringType>[])inputs)[0].getValue(i);
            out.setValue(i, new IntType(a.getValue().length()));
        }

        return new Column[] {
            out
        };
    }
}