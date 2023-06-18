package org.flowxlang.runtime.function.defaults.errorable;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.BoolType;
import org.flowxlang.runtime.type.column.Column;
import org.flowxlang.runtime.type.notation.Errorable;

public class ErrorToBool extends Function {
    @Override
    public Column[] calc(Column[] inputs) {
        int row = getRow(inputs);
        Column<BoolType> out = new Column<>(row);

        for (int i = 0; i < row; i++) {
            Errorable<BoolType> a = ((Column<Errorable<BoolType>>[])inputs)[0].getValue(i);
            BoolType b = ((Column<BoolType>[])inputs)[1].getValue(i);

            if (a.getIsError())
                out.setValue(i, new BoolType(b.getValue()));
            else
                out.setValue(i, new BoolType(a.getValue().getValue()));
        }

        return new Column[] {
            out
        };
    }
}