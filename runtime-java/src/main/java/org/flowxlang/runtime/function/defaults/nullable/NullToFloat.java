package org.flowxlang.runtime.function.defaults.nullable;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.FloatType;
import org.flowxlang.runtime.type.column.Column;
import org.flowxlang.runtime.type.notation.Nullable;

public class NullToFloat extends Function {
    @Override
    public Column[] calc(Column[] inputs) {
        int row = getRow(inputs);
        Column<FloatType> out = new Column<>(row);

        for (int i = 0; i < row; i++) {
            Nullable<FloatType> a = ((Column<Nullable<FloatType>>[])inputs)[0].getValue(i);
            FloatType b = ((Column<FloatType>[])inputs)[1].getValue(i);

            if (a.getIsNull())
                out.setValue(i, new FloatType(b.getValue()));
            else
                out.setValue(i, new FloatType(a.getValue().getValue()));
        }

        return new Column[] {
            out
        };
    }
}