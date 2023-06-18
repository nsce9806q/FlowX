package org.flowxlang.runtime.function.defaults.errorable;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.BoolType;
import org.flowxlang.runtime.type.column.Column;
import org.flowxlang.runtime.type.notation.Errorable;
import org.flowxlang.runtime.type.notation.Nullable;

public class ErrorToNullBool extends Function {
    @Override
    public Column[] calc(Column[] inputs) {
        int row = getRow(inputs);
        Column<Nullable<BoolType>> out = new Column<>(row);

        for (int i = 0; i < row; i++) {
            Errorable<BoolType> a = ((Column<Errorable<BoolType>>[])inputs)[0].getValue(i);

            if (a.getIsError())
                out.setValue(i, new Nullable<>());
            else
                out.setValue(i, new Nullable(new BoolType(a.getValue().getValue())));
        }

        return new Column[] {
            out
        };
    }
}