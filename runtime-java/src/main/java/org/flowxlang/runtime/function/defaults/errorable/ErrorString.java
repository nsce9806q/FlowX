package org.flowxlang.runtime.function.defaults.errorable;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.BoolType;
import org.flowxlang.runtime.type.StringType;
import org.flowxlang.runtime.type.column.Column;
import org.flowxlang.runtime.type.notation.Errorable;

public class ErrorString extends Function {
    @Override
    public Column[] calc(Column[] inputs) {
        int row = getRow(inputs);
        Column<Errorable<StringType>> out = new Column<>(row);

        for (int i = 0; i < row; i++) {
            BoolType a = ((Column<BoolType>[])inputs)[0].getValue(i);
            StringType b = ((Column<StringType>[])inputs)[1].getValue(i);
            if (a.getValue())
                out.setValue(i, new Errorable<>(new StringType(b.getValue())));
            else
                out.setValue(i, new Errorable<>());
        }

        return new Column[] {
            out
        };
    }
}