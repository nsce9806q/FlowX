package org.flowxlang.runtime.function.defaults.floatfunc;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.FloatType;
import org.flowxlang.runtime.type.column.Column;

public class MultFloat extends Function {
    @Override
    public Column[] calc(Column[] inputs) {
        int row = inputs[0].getRow();
        Column<FloatType> out = new Column<>(row);

        for (int i = 0; i < row; i++) {
            FloatType a = ((Column<FloatType>[])inputs)[0].getValue(i);
            FloatType b = ((Column<FloatType>[])inputs)[1].getValue(i);
            out.setValue(i, new FloatType(a.getValue() * b.getValue()));
        }

        return new Column[] {
            out
        };
    }
}