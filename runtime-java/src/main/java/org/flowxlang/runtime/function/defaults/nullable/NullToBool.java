package org.flowxlang.runtime.function.defaults.nullable;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.BoolType;
import org.flowxlang.runtime.type.column.Column;
import org.flowxlang.runtime.type.notation.Nullable;

public class NullToBool extends Function {
    @Override
    public Column[] calc(Column[] inputs) {
        int row = getRow(inputs);
        Column<BoolType> out = new Column<>(row);

        for (int i = 0; i < row; i++) {
            Nullable<BoolType> a = ((Column<Nullable<BoolType>>[])inputs)[0].getValue(i);
            BoolType b = ((Column<BoolType>[])inputs)[1].getValue(i);

            if (a.getIsNull())
                out.setValue(i, new BoolType(b.getValue()));
            else
                out.setValue(i, new BoolType(a.getValue().getValue()));
        }

        return new Column[] {
            out
        };
    }
}