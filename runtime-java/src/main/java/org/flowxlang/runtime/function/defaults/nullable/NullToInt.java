package org.flowxlang.runtime.function.defaults.nullable;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.BoolType;
import org.flowxlang.runtime.type.IntType;
import org.flowxlang.runtime.type.column.Column;
import org.flowxlang.runtime.type.notation.Nullable;

public class NullToInt extends Function {
    @Override
    public Column[] calc(Column[] inputs) {
        int row = getRow(inputs);
        Column<IntType> out = new Column<>(row);

        for (int i = 0; i < row; i++) {
            Nullable<IntType> a = ((Column<Nullable<IntType>>[])inputs)[0].getValue(i);
            IntType b = ((Column<IntType>[])inputs)[1].getValue(i);

            if (a.getIsNull())
                out.setValue(i, new IntType(b.getValue()));
            else
                out.setValue(i, new IntType(a.getValue().getValue()));
        }

        return new Column[] {
            out
        };
    }
}