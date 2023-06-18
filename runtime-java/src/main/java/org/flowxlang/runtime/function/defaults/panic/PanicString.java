package org.flowxlang.runtime.function.defaults.panic;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.StringType;
import org.flowxlang.runtime.type.column.Column;
import org.flowxlang.runtime.type.notation.Errorable;

public class PanicString extends Function {
    @Override
    public Column[] calc(Column[] inputs) throws PanicException {
        int row = getRow(inputs);
        Column<StringType> out = new Column<>(row);

        for (int i = 0; i < row; i++) {
            Errorable<StringType> a = ((Column<Errorable<StringType>>[])inputs)[0].getValue(i);

            if (a.getIsError()) {
                System.err.println("panic occurred");
                throw new PanicException();
            }
            else {
                out.setValue(i, new StringType(a.getValue().getValue()));
            }
        }

        return new Column[] {
            out
        };
    }
}