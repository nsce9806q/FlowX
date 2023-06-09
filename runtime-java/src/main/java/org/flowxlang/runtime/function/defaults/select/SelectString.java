package org.flowxlang.runtime.function.defaults.select;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.BoolType;
import org.flowxlang.runtime.type.StringType;
import org.flowxlang.runtime.type.column.Column;

public class SelectString extends Function {
    @Override
    public Column[] calc(Column[] inputs) {
        int row = inputs[0].getRow();
        Column<StringType> out = new Column<>(row);

        for (int i = 0; i < row; i++) {
            BoolType s = ((Column<BoolType>[])inputs)[0].getValue(i);
            StringType a = ((Column<StringType>[])inputs)[1].getValue(i);
            StringType b = ((Column<StringType>[])inputs)[2].getValue(i);
            out.setValue(i, new StringType(s.getValue() ? a.getValue() : b.getValue()));
        }

        return new Column[] {
            out
        };
    }
}