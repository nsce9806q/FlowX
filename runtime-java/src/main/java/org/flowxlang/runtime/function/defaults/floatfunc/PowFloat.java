package org.flowxlang.runtime.function.defaults.floatfunc;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.FloatType;
import org.flowxlang.runtime.type.column.Column;
import org.flowxlang.runtime.type.notation.Errorable;

public class PowFloat extends Function {
    @Override
    public Column[] calc(Column[] inputs) {
        int row = getRow(inputs);
        Column<Errorable<FloatType>> out = new Column<>(row);

        for (int i = 0; i < row; i++) {
            FloatType a = ((Column<FloatType>[])inputs)[0].getValue(i);
            FloatType b = ((Column<FloatType>[])inputs)[1].getValue(i);
            try {
                out.setValue(i, new Errorable<>(new FloatType((float)Math.pow(a.getValue(), b.getValue()))));
            }
            catch (Exception e) {
                out.setValue(i, new Errorable<>());
            }
        }

        return new Column[] {
            out
        };
    }
}