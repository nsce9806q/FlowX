package org.flowxlang.runtime.function.defaults.floatfunc;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.FloatType;
import org.flowxlang.runtime.type.column.Column;
import org.flowxlang.runtime.type.notation.Errorable;

public class DivFloat extends Function {
    @Override
    public Column[] calc(Column[] inputs) {
        int row = inputs[0].getRow();
        Column<Errorable<FloatType>> out = new Column<>(row);

        for (int i = 0; i < row; i++) {
            FloatType a = ((Column<FloatType>[])inputs)[0].getValue(i);
            FloatType b = ((Column<FloatType>[])inputs)[1].getValue(i);
            if (b.getValue() == 0.0f) {
                out.setValue(i, new Errorable<>());
            }
            else {
                out.setValue(i, new Errorable<>(new FloatType(a.getValue() / b.getValue())));
            }
        }

        return new Column[] {
            out
        };
    }
}