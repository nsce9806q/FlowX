package org.flowxlang.runtime.function.defaults.nullable;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.StringType;
import org.flowxlang.runtime.type.column.Column;
import org.flowxlang.runtime.type.notation.Nullable;

public class NullToString extends Function {
    @Override
    public Column[] calc(Column[] inputs) {
        int row = getRow(inputs);
        Column<StringType> out = new Column<>(row);

        for (int i = 0; i < row; i++) {
            Nullable<StringType> a = ((Column<Nullable<StringType>>[])inputs)[0].getValue(i);
            StringType b = ((Column<StringType>[])inputs)[1].getValue(i);

            if (a.getIsNull())
                out.setValue(i, new StringType(b.getValue()));
            else
                out.setValue(i, new StringType(a.getValue().getValue()));
        }

        return new Column[] {
            out
        };
    }
}