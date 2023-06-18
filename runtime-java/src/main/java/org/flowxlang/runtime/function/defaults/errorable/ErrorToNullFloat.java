package org.flowxlang.runtime.function.defaults.errorable;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.FloatType;
import org.flowxlang.runtime.type.column.Column;
import org.flowxlang.runtime.type.notation.Errorable;
import org.flowxlang.runtime.type.notation.Nullable;

public class ErrorToNullFloat extends Function {
    @Override
    public Column[] calc(Column[] inputs) {
        int row = getRow(inputs);
        Column<Nullable<FloatType>> out = new Column<>(row);

        for (int i = 0; i < row; i++) {
            Errorable<FloatType> a = ((Column<Errorable<FloatType>>[])inputs)[0].getValue(i);

            if (a.getIsError())
                out.setValue(i, new Nullable<>());
            else
                out.setValue(i, new Nullable(new FloatType(a.getValue().getValue())));
        }

        return new Column[] {
            out
        };
    }
}