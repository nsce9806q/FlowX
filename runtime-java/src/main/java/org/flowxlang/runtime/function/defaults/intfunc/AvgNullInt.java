package org.flowxlang.runtime.function.defaults.intfunc;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.FloatType;
import org.flowxlang.runtime.type.IntType;
import org.flowxlang.runtime.type.column.Column;
import org.flowxlang.runtime.type.notation.Errorable;
import org.flowxlang.runtime.type.notation.Nullable;

public class AvgNullInt extends Function {
    @Override
    public Column[] calc(Column[] inputs) {
        int row = getRow(inputs);
        Column<Errorable<FloatType>> out = new Column<>(row);

        float r = 0;
        int s = 0;
        for (int i = 0; i < row; i++) {
            Nullable<IntType> a = ((Column<Nullable<IntType>>[])inputs)[0].getValue(i);
            if (!a.getIsNull()) {
                r += a.getValue().getValue();
                s++;
            }
        }

        if (s == 0) {
            for (int i = 0; i < row; i++) {
                out.setValue(i, new Errorable<>());
            }
        }
        else {
            r /= s;
            for (int i = 0; i < row; i++) {
                out.setValue(i, new Errorable<>(new FloatType(r)));
            }
        }

        return new Column[] {
            out
        };
    }
}