package org.flowxlang.runtime.function.defaults.nullable;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.BoolType;
import org.flowxlang.runtime.type.FloatType;
import org.flowxlang.runtime.type.column.Column;
import org.flowxlang.runtime.type.notation.Nullable;

public class NullFloat extends Function {
    @Override
    public Column[] calc(Column[] inputs) {
        int row = getRow(inputs);
        Column<Nullable<FloatType>> out = new Column<>(row);

        for (int i = 0; i < row; i++) {
            BoolType a = ((Column<BoolType>[])inputs)[0].getValue(i);
            FloatType b = ((Column<FloatType>[])inputs)[1].getValue(i);
            if (a.getValue())
                out.setValue(i, new Nullable<>(new FloatType(b.getValue())));
            else
                out.setValue(i, new Nullable<>());
        }

        return new Column[] {
            out
        };
    }
}