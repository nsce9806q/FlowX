package org.flowxlang.runtime.function.defaults.conversion;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.FloatType;
import org.flowxlang.runtime.type.StringType;
import org.flowxlang.runtime.type.column.Column;
import org.flowxlang.runtime.type.notation.Errorable;

public class StringToFloat extends Function {
    @Override
    public Column[] calc(Column[] inputs) {
        int row = getRow(inputs);
        Column<Errorable<FloatType>> out = new Column<>(row);

        for (int i = 0; i < row; i++) {
            StringType a = ((Column<StringType>[])inputs)[0].getValue(i);
            try {
                out.setValue(i, new Errorable<>(new FloatType(Float.parseFloat(a.getValue()))));
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