package org.flowxlang.runtime.function.defaults.conversion;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.FloatType;
import org.flowxlang.runtime.type.IntType;
import org.flowxlang.runtime.type.column.Column;

public class FloatToInt extends Function {
    @Override
    public Column[] calc(Column[] inputs) {
        int row = inputs[0].getRow();
        Column<IntType> out = new Column<>(row);

        for (int i = 0; i < row; i++) {
            FloatType a = ((Column<FloatType>[])inputs)[0].getValue(i);
            out.setValue(i, new IntType((int)a.getValue()));
        }

        return new Column[] {
            out
        };
    }
}