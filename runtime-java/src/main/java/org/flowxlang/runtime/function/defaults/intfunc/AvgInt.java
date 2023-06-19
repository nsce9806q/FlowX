package org.flowxlang.runtime.function.defaults.intfunc;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.FloatType;
import org.flowxlang.runtime.type.IntType;
import org.flowxlang.runtime.type.column.Column;

public class AvgInt extends Function {
    @Override
    public Column[] calc(Column[] inputs) {
        int row = getRow(inputs);
        Column<FloatType> out = new Column<>(row);

        float r = 0;
        for (int i = 0; i < row; i++) {
            IntType a = ((Column<IntType>[])inputs)[0].getValue(i);
            r += a.getValue();
        }

        r /= row;
        for (int i = 0; i < row; i++) {
            out.setValue(i, new FloatType(r));
        }

        return new Column[] {
            out
        };
    }
}