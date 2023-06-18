package org.flowxlang.runtime.function.defaults.stringfunc;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.BoolType;
import org.flowxlang.runtime.type.StringType;
import org.flowxlang.runtime.type.column.Column;

public class RegexTest extends Function {
    @Override
    public Column[] calc(Column[] inputs) {
        int row = getRow(inputs);
        Column<BoolType> out = new Column<>(row);

        for (int i = 0; i < row; i++) {
            StringType a = ((Column<StringType>[])inputs)[0].getValue(i);
            StringType b = ((Column<StringType>[])inputs)[1].getValue(i);

            out.setValue(i, new BoolType(a.getValue().matches(b.getValue())));
        }

        return new Column[] {
            out
        };
    }
}