package org.flowxlang.runtime.function.defaults.intfunc;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.IntType;
import org.flowxlang.runtime.type.column.Column;
import org.flowxlang.runtime.type.notation.Errorable;

public class PowInt extends Function {
    @Override
    public Column[] calc(Column[] inputs) {
        int row = getRow(inputs);
        Column<Errorable<IntType>> out = new Column<>(row);

        for (int i = 0; i < row; i++) {
            IntType a = ((Column<IntType>[])inputs)[0].getValue(i);
            IntType b = ((Column<IntType>[])inputs)[1].getValue(i);

            if (b.getValue() < 0) {
                out.setValue(i, new Errorable<>());
            }
            else {
                int r = 1;
                for (int j = 0; j < b.getValue(); j++)
                    r *= a.getValue();
                out.setValue(i, new Errorable<>(new IntType(r)));
            }
        }

        return new Column[] {
            out
        };
    }
}