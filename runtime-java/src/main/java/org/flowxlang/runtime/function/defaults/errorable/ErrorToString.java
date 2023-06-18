package org.flowxlang.runtime.function.defaults.errorable;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.StringType;
import org.flowxlang.runtime.type.column.Column;
import org.flowxlang.runtime.type.notation.Errorable;

public class ErrorToString extends Function {
    @Override
    public Column[] calc(Column[] inputs) {
        int row = getRow(inputs);
        Column<StringType> out = new Column<>(row);

        for (int i = 0; i < row; i++) {
            Errorable<StringType> a = ((Column<Errorable<StringType>>[])inputs)[0].getValue(i);
            StringType b = ((Column<StringType>[])inputs)[1].getValue(i);

            if (a.getIsError())
                out.setValue(i, new StringType(b.getValue()));
            else
                out.setValue(i, new StringType(a.getValue().getValue()));
        }

        return new Column[] {
            out
        };
    }
}