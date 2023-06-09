package org.flowxlang.runtime.function.defaults.conversion;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.FloatType;
import org.flowxlang.runtime.type.IntType;
import org.flowxlang.runtime.type.column.Column;

public class IntToFloat extends Function {
    @Override
    public Column[] calc(Column[] inputs) {
        int row = inputs[0].getRow();
        Column<FloatType> out = new Column<>(row);

        for (int i = 0; i < row; i++) {
            IntType a = ((Column<IntType>[])inputs)[0].getValue(i);
            out.setValue(i, new FloatType((float)a.getValue()));
        }

        return new Column[] {
            out
        };
    }
}