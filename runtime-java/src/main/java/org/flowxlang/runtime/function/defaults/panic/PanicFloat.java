package org.flowxlang.runtime.function.defaults.panic;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.FloatType;
import org.flowxlang.runtime.type.column.Column;
import org.flowxlang.runtime.type.notation.Errorable;

public class PanicFloat extends Function {
    @Override
    public Column[] calc(Column[] inputs) throws PanicException {
        int row = getRow(inputs);
        Column<FloatType> out = new Column<>(row);

        for (int i = 0; i < row; i++) {
            Errorable<FloatType> a = ((Column<Errorable<FloatType>>[])inputs)[0].getValue(i);

            if (a.getIsError()) {
                System.err.println("panic occurred");
                throw new PanicException();
            }
            else {
                out.setValue(i, new FloatType(a.getValue().getValue()));
            }
        }

        return new Column[] {
            out
        };
    }
}