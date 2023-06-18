package org.flowxlang.runtime.function.defaults.errorable;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.IntType;
import org.flowxlang.runtime.type.column.Column;
import org.flowxlang.runtime.type.notation.Errorable;

public class ErrorToInt extends Function {
    @Override
    public Column[] calc(Column[] inputs) {
        int row = getRow(inputs);
        Column<IntType> out = new Column<>(row);

        for (int i = 0; i < row; i++) {
            Errorable<IntType> a = ((Column<Errorable<IntType>>[])inputs)[0].getValue(i);
            IntType b = ((Column<IntType>[])inputs)[1].getValue(i);

            if (a.getIsError())
                out.setValue(i, new IntType(b.getValue()));
            else
                out.setValue(i, new IntType(a.getValue().getValue()));
        }

        return new Column[] {
            out
        };
    }
}